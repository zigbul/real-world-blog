import { AVATAR_DEFAULT_URL } from './constants';
import defaultAvatar from './assets/defaultAvatar.svg';

export const setID = () => {
   return `_${Math.random().toString(36).substr(2, 9)}`;
};

export const setAvatarURL = (imageUrl) => {
   if (imageUrl === AVATAR_DEFAULT_URL) {
      return defaultAvatar;
   }
   return imageUrl;
}

export const token = localStorage.token;

export const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

export const AVATAR_REG_EXP = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;