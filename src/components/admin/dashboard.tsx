
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { signOut } from "@/app/auth/actions";
import type { User } from '@supabase/supabase-js';

export function AdminDashboard({ user }: { user: User }) {
  return (
    <main className="flex-1 flex items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>Welcome back, you are logged in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Email:</strong> {user.email}</p>
            <p>This is your protected admin dashboard. You can start adding content management features here.</p>
          </CardContent>
          <CardFooter>
            <form action={signOut}>
                <Button type="submit" variant="outline">Sign Out</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
