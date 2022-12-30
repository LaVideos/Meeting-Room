import {ChangePasswordComponent} from 'components';
import {useLocation, useNavigate} from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography'
import ProfileForm from 'components/profile/profile-form';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss'

const cn = classNames.bind(styles)

const Profile = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const goBack = () => navigate(-1)
  const from = location.state?.from?.pathname;

  const checkPath = (from: string) => {
    if (from === '/calendar') {
      return 'to calendar'
    }
    if (from === '/rooms') {
      return 'to rooms'
    }
    return ''
  }

  return (
      <div className={cn('profile-container')}>
          <div className={cn('go-back-container')}>{from && <KeyboardBackspaceIcon fontSize='large' sx={{color: 'var(--accent-text-color)',fontSize:'50px'}}/>}
              <div
                  className={cn('text')}
                  onClick={goBack}
              >  {from && `Go back ${checkPath(from)}`}
              </div></div>
          <div className={cn('profile-data-container')}><ProfileForm/>
              <ChangePasswordComponent/></div>
</div>
  )
}

export default Profile