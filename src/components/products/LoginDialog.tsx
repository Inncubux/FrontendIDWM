import { useRouter } from 'next/navigation';
import Login from '../../app/login/page';
import { on } from 'events';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';


interface LoginDialog {
    open: boolean;
    onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialog) => {
    const router = useRouter();

    const handleContinue =() =>{
        onClose();
        router.push('/login');
    }

    return(
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Inicia sesión</AlertDialogTitle>
                    <AlertDialogDescription>
                        Debes iniciar sesión para agregar productos al carrito.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancerlar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleContinue}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

};