import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../../utils/api';
import { SocketContext } from '../../../utils/context/SocketContext';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../../utils/styles';
import { UserCredentialsParams } from '../../../utils/types';
import styles from '../index.module.scss';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../store/settings/settingsSlice';
import React from 'react';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentialsParams>();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const onSubmit = async (data: UserCredentialsParams) => {
    console.log(socket);
    console.log(socket.connected);
    try {
       await postLoginUser(data)       
       .then((response) => {
        console.log("TOKEN", response.data.data)
          let token = response.data.data.accessToken;          
          dispatch(setToken(token));
          localStorage.setItem('token', token);          
       });     
      console.log('Success');
      socket.connect();
      console.log(socket.connected);
      navigate('/conversations');
    } catch (err) {
      console.log(socket.connected);
      console.log(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="username">Username</InputLabel>
        <InputField
          type="text"
          id="username"
          {...register('username', { required: true })}
        />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
      </InputContainer>
      <Button>Login</Button>
      <div className={styles.footerText}>
        <span>Don't have an account? </span>
        <Link to="/register">
          <span>Register</span>
        </Link>
      </div>
    </form>
  );
};
