import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import FontIcon from 'material-ui/FontIcon';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class SuccessDialog extends React.Component {
    handleClose = () => {

        const { updateAppState } = this.props

        updateAppState({ shouldOpenDialog: false })
    }

    render() {
        const { fbPost, shouldOpenDialog } = this.props
        const actions = [
            <FlatButton
                label="Close"
                //primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="See Post On Facebook"
                href={fbPost.link}
                primary={true}
                //keyboardFocused={true}
                target="_blank"
                icon={<FontIcon className="fa fa-facebook" />}
            //onTouchTap={this.handleClose}
            />,
        ];
        let d = new Date()
        if (fbPost.crated_time) {
            d = new Date(fbPost.created_time)
        }
        return (
            <div>

                <Dialog
                    title="Congratulations!"
                    actions={actions}
                    modal={false}
                    open={shouldOpenDialog}
                    onRequestClose={this.handleClose}
                >
                    The web screenshot was succesfully published to your Facebook account on {d.toDateString()} at {d.toTimeString()}.
        </Dialog>
            </div>
        );
    }
}