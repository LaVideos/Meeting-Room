import React from 'react';
import {FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister} from "react-hook-form";
import classNames from 'classnames/bind';
import styles from './InputClear.module.scss'

const cn = classNames.bind(styles)


interface IInput {
    placeHolder: string,
    placeholderDisappear?: string,
    type: "text" | "" | "password" | "login" | string,

    isValid: boolean,
    name: string;
    required: boolean,
    defaultValue?:string

    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    register?: UseFormRegister<FieldValues> | any,

    size?: "small" | "medium" | "large" | "extra-small"
}

const InputRe =
    ({type, placeHolder, name, required, isValid, error, register, placeholderDisappear, size,defaultValue}
         : IInput) => {

        return (
            <div className={cn(`container-${size ? size : "small"}`)} data-testid={'container'}>
                <div className={cn('inputField', error && 'inputFieldError')}>
                    <input type={type}
                           {...register(`${name}`, {
                               required: required,
                           })}
                           placeholder={placeholderDisappear}
                           required
                           id={`${name}-input`}
                           defaultValue={defaultValue?defaultValue:''}
                    />
                    <label htmlFor={`${name}-input`}>{placeHolder}</label>
                </div>
                <span className={cn(isValid && "error_container")}>{(error?.message && isValid) &&
                    <span>{`${error.message}`}</span>}</span>
            </div>
        );
    };

export default InputRe;