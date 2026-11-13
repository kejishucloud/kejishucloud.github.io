import React, { useEffect, useState } from 'react';

type Effects = typeof import('shaders/react');

/**
 * 按需激活 WebGPU 背景。阅读内容与视觉不依赖 GPU；
 * 禁用动画、WebGPU 不可用或标签页不可见时销毁 Shader 组件。
 */
export default function HeroShader(): React.ReactElement | null {
  const [components, setComponents] = useState<Effects | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let disposed = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setVisible(!document.hidden && !motion.matches);
    };
    update();
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    if ('gpu' in navigator && !motion.matches && window.innerWidth > 640) {
      import('shaders/react').then(module => {
        if (!disposed) setComponents(module);
      }).catch(() => setComponents(null));
    }
    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);
  if (!components || !visible) return null;
  const { Shader, LinearGradient } = components;
  return (
    <div className="shader-layer" aria-hidden="true">
      <Shader className="shader-canvas">
        <LinearGradient colorA="#090d18" colorB="#3659f5" />
      </Shader>
    </div>
  );
}
