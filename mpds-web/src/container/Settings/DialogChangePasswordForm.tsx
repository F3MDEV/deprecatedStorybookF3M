import React, { FunctionComponent } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';

import ChangePasswordForm from './ChangePasswordForm';

function DialogChangePasswordForm(props: any) {
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
    <div>
      <Dialog
        open={props.showChangePassModal}
        onClose={props.onClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        maxWidth='md'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        disableBackdropClick // don't close modal when click outside
        disableEscapeKeyDown // don't close modal with ESC KEY
      >
        <ChangePasswordForm
          changeShowFormPass={props.changeShowFormPass}
          save={(values: any, email: any) => props.saveChangePass(values, email)}
          email={props.email}
          scroll={scroll}
          descriptionElementRef={descriptionElementRef}
        />
      </Dialog>
    </div>
  );
}

export default DialogChangePasswordForm;
