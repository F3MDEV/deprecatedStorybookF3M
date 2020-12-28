import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';
import UsersInfoForm from "./UsersInfoForm"

type saveUserFnType = (value: any) => String | false | undefined;
type onCloseFnType = (value: boolean) => String | false | undefined;
type onAddFnType = (value: any) => String | false | undefined;
type onValidateFnType = () => boolean | undefined;
type perfil = {
  id: string; 
  name: string;
}

interface IInstitutionsUser {
  rowKey: string;
  name: string;
  profile: perfil; 
  //active: boolean;
  updated: boolean;
}

interface IInstitutions {
  rowKey: string;
  name: string;
}

interface IUser {
  email: string;
  name: string;
  contact: string;
  speciality: string;
  photoUri: string;
  institutions: IInstitutionsUser[];
}

interface IPersonalUserInfoProps {
  showUserInfoModal: boolean;
  onClose: onCloseFnType;
  saveUser: saveUserFnType;
  editMode: boolean;
  userInfo: IUser;
  allInstitutions: IInstitutions[];
  onAddInstitutionToUser: onAddFnType;
  saveInProgress: boolean;
  onValidadeEmailMpDS: onValidateFnType;
  actualUser: string;
  isLoading: boolean;
  allProfiles: any;
}



function DialogUsersForm({
  showUserInfoModal, onClose, saveUser, editMode, userInfo, allInstitutions, onAddInstitutionToUser, saveInProgress, onValidadeEmailMpDS, actualUser, isLoading, allProfiles
}:IPersonalUserInfoProps ) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

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
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableBackdropClick //don't close modal when click outside
        disableEscapeKeyDown //don't close modal with ESC KEY
      >
        <UsersInfoForm 
            editMode={editMode}
            onClose={(isTouched) => onClose(isTouched)}
            saveUser={(v: any) => saveUser(v)} 
            userInfo={userInfo}
            scroll={scroll} 
            descriptionElementRef={descriptionElementRef}
            allInstitutions={allInstitutions}
            onAddInstitutionToUser={onAddInstitutionToUser}
            saveInProgress={saveInProgress}
            onValidadeEmailMpDS={() => onValidadeEmailMpDS()}
            actualUser={actualUser}
            isLoading={isLoading}
            allProfiles={allProfiles}
        /> 
      </Dialog>
  );
}

export default DialogUsersForm;