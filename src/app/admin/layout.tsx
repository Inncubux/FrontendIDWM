'use client';

import { decodeJWT } from "@/helpers/decodeJWT";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminLayout({children}: {children: React.ReactNode}) {
    const {user, status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.token) {
            router.replace('/login');
            return;
        }

        const payload = decodeJWT(user.token);
        if (!payload || payload.role !== 'Admin') {
            console.error("Token invalido");
            router.replace('/');
            return;
        }
    }, [user,status, router]);

    return (
        <div>
            hola
        </div>
    )
};