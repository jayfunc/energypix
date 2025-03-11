"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { refreshIntervalForPresentation, refreshIntervalForProduction } from "@/constants/time";
import ApiService from "@/services/api";
import { motion } from "motion/react";
import { useState } from "react";

export default function Page() {
  const [presentationMode, setPresentationMode] = useState<boolean>(ApiService.refreshInterval === refreshIntervalForPresentation);

  return (
    <motion.div
      className="grid grid-cols-4 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Dev</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between items-center gap-2">
            Switch refresh interval {" (Current refresh interval: " + ApiService.refreshInterval / 1000 + " seconds)"}
            <Switch checked={presentationMode} onCheckedChange={(value) => {
              ApiService.refreshInterval = value ? refreshIntervalForPresentation : refreshIntervalForProduction;
              fetch(ApiService.buildSimIntervalSetterUri(ApiService.refreshInterval));
              setPresentationMode(value);
            }} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
