import { Injectable } from '@angular/core';

export type AlertSeverity = 'alta' | 'media' | 'baja';

export interface AppAlert {
  id: string;
  area: 'campo' | 'veterinario' | 'administracion';
  severity: AlertSeverity;
  title: string;
  message: string;
  createdAt: number;
  dismissed?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private storageKey = 'agrosoft_alerts';

  private getAll(): AppAlert[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveAll(alerts: AppAlert[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(alerts));
  }

  getAlerts(area: AppAlert['area']): AppAlert[] {
    return this.getAll()
      .filter(a => a.area === area && !a.dismissed)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  addAlert(alert: Omit<AppAlert, 'id' | 'createdAt'>) {
    const alerts = this.getAll();

    const newAlert: AppAlert = {
      ...alert,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      dismissed: false
    };

    alerts.unshift(newAlert);
    this.saveAll(alerts);
  }

  dismissAlert(id: string) {
    const alerts = this.getAll().map(a =>
      a.id === id ? { ...a, dismissed: true } : a
    );

    this.saveAll(alerts);
  }

  clearArea(area: AppAlert['area']) {
    const alerts = this.getAll().map(a =>
      a.area === area ? { ...a, dismissed: true } : a
    );

    this.saveAll(alerts);
  }
}