import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    users: [],
    surveys: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    addSurvey(state, survey) {
      state.surveys.push(survey);
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('YOUR_API_URL/login', credentials);
        commit('setUser', response.data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('YOUR_API_URL/register', userData);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async submitSurvey({ commit }, surveyData) {
      try {
        const response = await axios.post('YOUR_API_URL/surveys', surveyData);
        commit('addSurvey', response.data);
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
});