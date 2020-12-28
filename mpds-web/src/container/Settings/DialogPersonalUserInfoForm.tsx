import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';

import PersonalUserInfoForm from './PersonalUserInfoForm';

type saveUserFnType = (value: any) => string | false | undefined;
type onCloseFnType = (value: boolean) => string | false | undefined;

interface IPersonalUserInfoProps {
  showUserInfoModal: boolean;
  onClose: onCloseFnType;
  saveUser: saveUserFnType;
  userInfo: any;
}

function DialogPersonalUserInfoForm({
  showUserInfoModal,
  onClose,
  saveUser,
  userInfo
}: IPersonalUserInfoProps) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={showUserInfoModal}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      maxWidth='md'
      fullWidth={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      disableBackdropClick // don't close modal when click outside
      disableEscapeKeyDown // don't close modal with ESC KEY
    >
      <PersonalUserInfoForm
        onClose={(isTouched: boolean) => onClose(isTouched)}
        saveUser={(event: any) => saveUser(event)}
        userInfo={userInfo}
        scroll={scroll}
        descriptionElementRef={descriptionElementRef}
      />
    </Dialog>
  );
}

export default DialogPersonalUserInfoForm;
