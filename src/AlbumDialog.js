import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class AlbumDialog extends React.Component {

    handleOpen = () => {
        const { updateAppState } = this.props
        updateAppState({ openAlbumDialog: true });
    };

    handleClose = () => {
        const { updateAppState } = this.props
        updateAppState({ openAlbumDialog: false });
    };

    handleChange = (e, k, v) => {

        const { updateAppState } = this.props

        if (parseInt(v)) {
            updateAppState({ targetAlbumId: v });
        } else {
            console.log(v)
            updateAppState({ targetAlbumId: v });
        }
    }

    handleSave = () => {
        const { createAlbumAndSave, appState, postToFacebook } = this.props
        if (parseInt(appState.targetAlbumId) === 0) {
            createAlbumAndSave();
        }
        else {

            postToFacebook()
        }

    }

    render() {
        const {
            isPosting,
            updateAppState,
            appState
         } = this.props
        const { openAlbumDialog, albums } = appState
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSave}
                disabled={parseInt(appState.targetAlbumId) === 0 && (appState.albumData.name.length <= 0 || appState.albumData.message.length <= 0)}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Save Screenshot To An Album"
                    actions={actions}
                    modal={false}
                    open={openAlbumDialog}
                    onRequestClose={this.handleClose}
                    style={{ maxHeight: 500 }}
                    autoScrollBodyContent={true}
                >
                    <p>Choose a target album or create new one.</p>
                    <SelectField
                        value={appState.targetAlbumId}
                        onChange={this.handleChange}
                        maxHeight={200}
                    >
                        <MenuItem value="0" key="new" primaryText="Create A New Album" />
                        {
                            albums.map((item, index) => {
                                return <MenuItem value={item.id} key={item.id} primaryText={item.name} />
                            })
                        }
                    </SelectField>
                    {parseInt(appState.targetAlbumId) === 0 &&
                        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>

                            <TextField
                                hintText="Album Title"
                                // floatingLabelText="Input a target URL"
                                //floatingLabelFixed={true}
                                value={appState.albumData.name}
                                onChange={(e) => {
                                    updateAppState({ albumData: { ...appState.albumData, ...{ name: e.target.value } } })
                                }}


                            />

                            <TextField
                                hintText="Album Caption"
                                // floatingLabelText="Input a target URL"
                                //floatingLabelFixed={true}
                                value={appState.albumData.message}
                                onChange={(e) => {
                                    updateAppState({ albumData: { ...appState.albumData, ...{ message: e.target.value } } })
                                }}
                                multiLine={true}
                                rows={1}
                                rowsMax={6}

                            />

                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}