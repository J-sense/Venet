// /home/workdir/artifacts/UserSecurityMain.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import { useState } from "react";

export default function UserNotifications() {
  const [_twoFactor, _setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  return (
    <div className="space-y-6">
      <Card className="bg-[#122131] border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            Security Settings
          </CardTitle>
          <p className="text-zinc-400 text-sm">
            Manage your account security preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Login Alerts */}
          <div className="flex items-center justify-between   rounded-xl p-6">
            <div>
              <h3 className="font-semibold text-white">Login Alerts</h3>
              <p className="text-sm text-zinc-400 mt-1">
                Get notified when someone logs into your account
              </p>
            </div>
            <Switch
              checked={loginAlerts}
              onCheckedChange={setLoginAlerts}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          {/* Automatic Session Timeout */}
          <div className="flex items-center justify-between   rounded-xl p-6">
            <div>
              <h3 className="font-semibold text-white">
                Automatic Session Timeout
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Log out automatically after 30 minutes of inactivity
              </p>
            </div>

            <Switch
              checked={sessionTimeout}
              onCheckedChange={setSessionTimeout}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
