/**
 * useMagnifier
 * -----------------
 * Hook customizado para criar uma lupa (magnifier) em uma imagem.
 *
 * Origem:
 * "Image Magnifier Glass" do W3Schools:
 * https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
 *
 * Funcionalidade:
 * - Cria um elemento div que funciona como lupa
 * - Segue o cursor do mouse
 * - Amplia a área sob a lupa
 */

import { useEffect } from "react";

export function useMagnifier(
  imgRef: React.RefObject<HTMLImageElement>,
  zoom = 2
) {
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !img.parentElement) return;

    const glass = document.createElement("div");
    glass.className = "img-magnifier-glass";
    glass.style.display = "none";
    glass.style.zIndex = "10";
    img.parentElement.insertBefore(glass, img);

    function updateGlassBackground() {
      glass.style.backgroundImage = `url('${img.src}')`;
      glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom
        }px`;
    }

    function getCursorPos(e: MouseEvent | TouchEvent) {
      const rect = img.getBoundingClientRect();
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
      const x = pageX - rect.left - window.pageXOffset;
      const y = pageY - rect.top - window.pageYOffset;
      return { x, y };
    }

    function moveMagnifier(e: MouseEvent | TouchEvent) {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x;
      let y = pos.y;

      const w = glass.offsetWidth / 2;
      const h = glass.offsetHeight / 2;
      const bw = 2;

      if (x > img.width - w / zoom) x = img.width - w / zoom;
      if (x < w / zoom) x = w / zoom;
      if (y > img.height - h / zoom) y = img.height - h / zoom;
      if (y < h / zoom) y = h / zoom;

      glass.style.left = `${x - w}px`;
      glass.style.top = `${y - h}px`;
      glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${y * zoom - h + bw
        }px`;
    }

    function showGlass() {
      updateGlassBackground();
      glass.style.display = "block";
    }

    function hideGlass() {
      glass.style.display = "none";
    }

    img.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("mouseenter", showGlass);
    img.addEventListener("mouseleave", hideGlass);

    // Recalcula background se a imagem for redimensionada
    const resizeObserver = new ResizeObserver(updateGlassBackground);
    resizeObserver.observe(img);

    return () => {
      img.removeEventListener("mousemove", moveMagnifier);
      img.removeEventListener("touchmove", moveMagnifier);
      img.removeEventListener("mouseenter", showGlass);
      img.removeEventListener("mouseleave", hideGlass);
      resizeObserver.disconnect();
      glass.remove();
    };
  }, [imgRef, zoom]);
}
