import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,
    Box,
} from '@mui/material';

interface ConfirmActionDialogProps {
    open: boolean;
    action: 'suspend' | 'delete' | null;
    userName: string;
    reason: string;
    onReasonChange: (reason: string) => void;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
    open,
    action,
    userName,
    reason,
    onReasonChange,
    onClose,
    onConfirm,
}) => {
    const isDelete = action === 'delete';
    const isSuspend = action === 'suspend';

    const getTitle = () => {
        if (isDelete) return 'Delete User';
        if (isSuspend) return 'Suspend User';
        return 'Confirm Action';
    };

    const getMessage = () => {
        if (isDelete)
            return `Are you sure you want to delete ${userName}? This action cannot be undone.`;
        if (isSuspend) return `Are you sure you want to suspend ${userName}?`;
        return 'Are you sure you want to proceed?';
    };

    const getConfirmColor = () => {
        if (isDelete) return 'error';
        return 'warning';
    };

    const getConfirmText = () => {
        if (isDelete) return 'Delete';
        if (isSuspend) return 'Suspend';
        return 'Confirm';
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {getMessage()}
                </Typography>
                <TextField
                    autoFocus
                    label="Reason (optional)"
                    multiline
                    rows={3}
                    fullWidth
                    value={reason}
                    onChange={(e) => onReasonChange(e.target.value)}
                    placeholder="Provide a reason for this action..."
                    sx={{ mt: 1 }}
                />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color={getConfirmColor()}
                    variant="contained"
                >
                    {getConfirmText()}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmActionDialog;
