import axios from "axios";
import { useEffect } from "react";

useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    const initData = tg.initDataUnsafe;
    axios.post('http://localhost:3000/auth/telegram', initData)
      .then(response => {
        if (response.data.success) {
          console.log('User authenticated successfully');
        } else {
          console.log('Authentication failed');
        }
      })
      .catch(error => {
        console.error('Error during authentication', error);
      });
    },[]);