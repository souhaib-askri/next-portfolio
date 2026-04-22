'use client';

import { useState, useEffect } from 'react';

export interface ClockState {
  time: string;
  date: string;
}

export function useClock(): ClockState {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const h = n.getHours().toString().padStart(2, '0');
      const m = n.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);

      const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      setDate(`${days[n.getDay()]} ${n.getDate()} ${months[n.getMonth()]}`);
    };

    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return { time, date };
}
