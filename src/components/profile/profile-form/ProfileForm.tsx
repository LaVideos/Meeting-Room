import {Box} from '@mui/material';
import React, {useState} from 'react'
import classNames from 'classnames/bind';
import styles from './profileForm.module.scss'
import Avatar from './avatar/Avatar';
import Button from 'components/interactive-tools/button';
import {useForm} from "react-hook-form";
import CheckboxWithLabel from 'components/interactive-tools/checkbox-with-label';
import {
    getFromLocalStorage,
    getUserData,
    removeFromLocalStorage,
    setToLocalStorage
} from 'services/local-storage.service';
import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom';
import Toggle from "../../interactive-tools/toggle/Toggle";
import InputRe from 'components/interactive-tools/input/InputRe';
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {ChangeLoginSchema} from "../../../utils/yup.validation";

const cn = classNames.bind(styles);
interface FormValues {
    firstName: string;
    lastName: string;
}
type FormName = 'firstName' | 'lastName'
const userName: FormName[] = ['firstName', 'lastName']

const ProfileForm = () => {
    const [weekends, setWeekends] = useState<boolean>(getFromLocalStorage('weekends') || false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const navigate = useNavigate()




    const handleWeekendsToggle = () => {
        setWeekends(prev => !prev)
        setToLocalStorage('weekends', !weekends)
    }

    const handleImageUrl = (url: string) => {
        setImageUrl(url)
    }
    const handleSelectedImg = (file: File) => {
        setSelectedImage(file)
    }
    const handleLogOut = () => {
        removeFromLocalStorage('access')
        removeFromLocalStorage('user')
        removeFromLocalStorage('role')
        navigate('/auth/login', { replace: true })
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm({ mode: 'all',
        resolver: yupResolver(ChangeLoginSchema)
    });

    const submit = (data: any) => {
        console.log(data)
        reset()
    }

    const themeLS = getFromLocalStorage('theme');
    let theme = themeLS ? JSON.parse(themeLS) : undefined;

    const { firstName, lastName, email } = getUserData();

    const user = { firstName: firstName, lastName: lastName }

    // const inputUserName =
        // userName.map((name: FormName) => (
        // <TextField
        //     key={name}
        //     sx={{ mr: '10px', width: '290px' }}
        //     defaultValue={user[name] || ''}
        //     label={name === 'firstName' ? 'First name' : 'Last name'}
        //     error={Boolean(errors[name])}
        //     data-testid={name}
        //     helperText={errors[name] ? errors[name]?.message : ''}
        //     {...register(name, {
        //         required: Errors.userLength,
        //         maxLength: {
        //             value: 25,
        //             message: Errors.userLength
        //         },
        //         minLength: {
        //             value: 2,
        //             message: Errors.userLength
        //         }
        //     })}
        // />
    // ))

    return (
        <Box className={cn('ProfileContainer')}>
            <div className={cn('profile')}><Box sx={{ color: 'var(--accent-text-color)' }} component="h1"> Profile</Box>
                <div className={cn('toggle')}><Toggle type={"themeToggle"} onclick={() => {
                    theme = !theme;
                    setToLocalStorage('theme', JSON.stringify(theme));
                    theme ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
                }} size={"large"} />
                </div>
            </div>
            <Box sx={{ position: 'relative', textAlign: 'center', mb: '40px', }}>
                <Avatar
                    imageUrl={imageUrl}
                    handleImageUrl={handleImageUrl}
                    handleSelectedImg={handleSelectedImg}
                />
                <Typography
                    variant='h5'
                    sx={{ mt: '20px', textAlign: 'center', color: 'var(--accent-text-color)' }}
                > {email}
                </Typography>
            </Box>
            <Box
                component='form'
                className={cn('form')}
                autoComplete="off"
                onSubmit={handleSubmit(submit)}
            >
                <div className={cn('input-container')} >
                    <InputRe
                        isValid={true}
                        error={errors.login}
                        type={"login"}
                        register={register}
                        name={'login'}
                        placeHolder={'Name and surname'}
                        required={true}
                        placeholderDisappear={user.firstName+' '+user.lastName}
                        size={"small"}
                        defaultValue={user.firstName+' '+user.lastName}
                    />
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        disabled={!isDirty || !isValid}
                        type='submit'
                        onclick={() => {
                        }}>
                        save changes
                    </Button>
                </Box>
            </Box>
            <Box sx={{ m: '30px 0' }}>
                < CheckboxWithLabel
                    label='Show weekends on calendar'
                    checked={weekends}
                    onChange={handleWeekendsToggle}
                    sx={{ marginLeft: '0', color: 'var(--accent-text-color)', fontSize: '20px' }}
                />
            </Box>
            <Box sx={{ textAlign: 'end' }}>
                <Button
                    dataTestId='button-log-out'
                    onclick={handleLogOut}
                >
                    Log out
                </Button>
            </Box>
        </Box>
    )
}

export default ProfileForm