<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Users List</ion-title>
        <ion-buttons slot="end">
          <ion-button color="primary" @click="addUser">
            <ion-icon :icon="addOutline" slot="start"></ion-icon>
            Add User
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Loading Skeleton -->
      <div v-if="loading">
        <ion-list>
          <ion-item v-for="n in 3" :key="n">
            <ion-avatar slot="start">
              <ion-skeleton-text animated></ion-skeleton-text>
            </ion-avatar>
            <ion-label>
              <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
              <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
              <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- User List -->
      <ion-list v-else>
        <ion-item-sliding v-for="user in users" :key="user.id" ref="slidingItems">
          <ion-item>
            <ion-avatar slot="start">
              <ion-icon
                :icon="personCircleOutline"
                size="large"
                class="ion-padding"
              ></ion-icon>
            </ion-avatar>

            <ion-label>
              <h2 class="ion-text-wrap">{{ user.name }}</h2>
              <p>{{ user.email }}</p>
              <ion-badge :color="getRoleColor(user.role)">{{ user.role }}</ion-badge>
            </ion-label>

            <ion-note slot="end">
              {{ formatDate(user.created_at) }}
            </ion-note>
          </ion-item>

          <ion-item-options>
            <ion-item-option color="warning" @click="handleEdit(user)">
              <ion-icon slot="start" :icon="createOutline"></ion-icon>
              Edit
            </ion-item-option>
            <ion-item-option color="danger" @click="handleDelete(user)">
              <ion-icon slot="start" :icon="trashOutline"></ion-icon>
              Delete
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <!-- Refresh Control -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- No Users Message -->
      <div v-if="!loading && users.length === 0" class="ion-text-center ion-padding">
        <ion-icon :icon="peopleOutline" size="large" color="medium"></ion-icon>
        <p>No users found</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  personCircleOutline,
  createOutline,
  trashOutline,
  addOutline,
  peopleOutline
} from 'ionicons/icons'
import { alertController, toastController, loadingController } from '@ionic/vue'
import axiosInstance from '../plugins/axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const loading = ref(true)
const slidingItems = ref([])

// Fetch users with loading state
const fetchUsers = async () => {
  loading.value = true
  try {
    const resp = await axiosInstance.get('/users')
    store.state.users = resp.data
  } catch (error) {
    showToast(error.response?.data?.message || 'Failed to fetch users')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})

const users = computed(() => store.state.users)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getRoleColor = (role) => {
  const colors = {
    'ADMINISTRATEUR': 'primary',
    'ENQUETEUR': 'tertiary'
  }
  return colors[role] || 'medium'
}

// Toast helper
const showToast = async (message, color = 'danger') => {
  const toast = await toastController.create({
    message,
    duration: 3000,
    position: 'bottom',
    color
  })
  await toast.present()
}

// Loading helper
const showLoading = async (message) => {
  const loading = await loadingController.create({
    message,
    spinner: 'circular'
  })
  await loading.present()
  return loading
}

const handleRefresh = async (event) => {
  try {
    await fetchUsers()
  } finally {
    event.target.complete()
  }
}

const addUser = () => {
  router.push('/users/add')
}

const handleEdit = async (user) => {
  // Close the sliding item
  const slidingItem = slidingItems.value.find(item => 
    item.$el.contains(document.activeElement)
  )
  if (slidingItem) {
    await slidingItem.$el.close()
  }

  // Show loading
  const loading = await showLoading('Preparing to edit...')
  
  try {
    router.push(`/users/${user.id}/edit`)
  } finally {
    loading.dismiss()
  }
}

const handleDelete = async (user) => {
  // Close the sliding item
  const slidingItem = slidingItems.value.find(item => 
    item.$el.contains(document.activeElement)
  )
  if (slidingItem) {
    await slidingItem.$el.close()
  }

  const alert = await alertController.create({
    header: 'Confirm Delete',
    message: `Are you sure you want to delete ${user.name}?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => deleteUser(user.id)
      }
    ],
    cssClass: 'custom-alert'
  })
  await alert.present()
}

const deleteUser = async (userId) => {
  const loading = await showLoading('Deleting user...')
  
  try {
    await axiosInstance.delete(`/users/${userId}`)
    store.state.users = store.state.users.filter(user => user.id !== userId)
    showToast('User deleted successfully', 'success')
  } catch (error) {
    showToast(error.response?.data?.message || 'Failed to delete user')
  } finally {
    loading.dismiss()
  }
}
</script>

<style scoped>
ion-badge {
  margin-top: 8px;
}

ion-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

ion-note {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
}

/* Custom alert styles */
:deep(.custom-alert) .alert-button {
  text-transform: none;
}

:deep(.custom-alert) .alert-button.ion-focused,
:deep(.custom-alert) .alert-button:hover {
  background-color: var(--ion-color-light);
}
</style>