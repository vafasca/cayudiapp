export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  status: 'in-progress' | 'completed' | 'pending';
  progress: number;
  nextLesson: string;
}

export interface Activity {
  id: string;
  type: 'class' | 'assignment' | 'exam';
  title: string;
  time: string;
  date: string;
}

export interface Metric {
  label: string;
  value: string;
  color: string;
  icon: string;
}

export interface UserStats {
  totalHours: number;
  progressPercent: number;
  achievements: number;
  activeCourses: number;
  pendingEvaluations: number;
}
