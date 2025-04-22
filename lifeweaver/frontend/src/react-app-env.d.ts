/// <reference types="react-scripts" />

declare module '*.json' {
  const content: any;
  export default content;
}

declare module 'lottie-react' {
  import React from 'react';
  
  interface LottieProps {
    animationData: any;
    loop?: boolean;
    autoplay?: boolean;
    style?: React.CSSProperties;
    className?: string;
    rendererSettings?: any;
    [key: string]: any;
  }
  
  const Lottie: React.FC<LottieProps>;
  export default Lottie;
}

declare module 'lucide-react' {
  import React from 'react';
  
  interface IconProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const PenLine: Icon;
  export const Heart: Icon;
  export const Feather: Icon;
  export const Smile: Icon;
  export const Plus: Icon;
  export const X: Icon;
  export const Copy: Icon;
  export const Download: Icon;
  export const Book: Icon;
  export const PenTool: Icon;
  export const Github: Icon;
  export const Mail: Icon;
  export const Calendar: Icon;
  export const MapPin: Icon;
  export const Star: Icon;
  export const Award: Icon;
  export const Sparkles: Icon;
} 