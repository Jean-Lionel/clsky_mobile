import { createStore } from 'vuex';
import axiosInstance from '../plugins/axios';

export default createStore({
  state: {
    user: null,
    users: [],
    surveys: [],
    clients: [],
    reports: [],
    totalClients : 0,
   // isAuthenticated : true,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTotalClients(state, total) {
      state.totalClients = total;
    },
    setUsers(state, users) {
      state.users = users;
    },
    addSurvey(state, survey) {
      state.surveys.push(survey);
    }
  },
  getters: {
    isAuthenticated() {
      return true;
    },
    connectedUser() {
      const u = JSON.parse(localStorage.getItem('user')); 
      ///console.log();
      return u
    },
    isAdamin() {
      const u = JSON.parse(localStorage.getItem('user')); 
      return  u.user?.role === 'ADMINISTRATEUR'
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axiosInstance.post('login', credentials);
        localStorage.setItem('token' , response.data?.token);
        localStorage.setItem('user' , JSON.stringify(response.data));
        commit('setUser', response.data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axiosInstance.post('register', userData);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async submitSurvey({ commit }, surveyData) {
      try {
        const response = await axiosInstance.post('clients', surveyData);
        commit('addSurvey', response.data);
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
});