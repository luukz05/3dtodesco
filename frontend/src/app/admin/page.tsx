"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (user === "admin" && password === "1234") {
      localStorage.setItem("adminToken", "1234");
      router.push("/admin/dashboard");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm">
        <Card className="shadow-sm rounded-xl p-10 border border-slate-200">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-slate-800">
              Login Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  id="user"
                  placeholder="Digite seu usuário"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full rounded-lg font-medium"
              >
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
