/* eslint-disable @typescript-eslint/no-explicit-any */
import "cropperjs/dist/cropper.css";
import Slider from "rc-slider";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface ImageCaroselProps {
  setValue: UseFormSetValue<any>;
  error?: string;
  name: string;
  trigger: UseFormTrigger<any>;
}

const ImageCarousel = ({
  setValue,
  name,
  error,
  trigger,
}: ImageCaroselProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const cropperRef = useRef<any>(null);
  const swiperRef = useRef<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setZoom(0);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const size = Math.max(img.width, img.height);
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, size, size);

            const xOffset = (size - img.width) / 2;
            const yOffset = (size - img.height) / 2;
            ctx.drawImage(img, xOffset, yOffset);

            setImageToCrop(canvas.toDataURL("image/png"));
            setShowModal(false);
            setShowCropper(true);
            if (swiperRef.current) {
              swiperRef.current.swiper.update();
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = async () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImage = croppedCanvas.toDataURL("image/jpeg");

        setImages((prev) => [...prev, croppedImage]);

        const imageList = images;
        imageList.push(croppedImage);
        setValue(name, imageList);

        trigger(name);
      }
    }
    setShowCropper(false);
    setImageToCrop(null);
  };

  const handleRemoveImage = (index: number) => {
    const imageList = images.filter((_, i) => i !== index);
    setValue(name, imageList);

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="image-carousel w-100 mb-4">
      <div className="d-flex align-items-center justify-content-between w-100 mt-3">
        <h5>Fotos do Produto</h5>
        <Button
          variant="success"
          size="sm"
          className="px-5"
          onClick={() => setShowModal(true)}
        >
          Adicionar
        </Button>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={4}
        spaceBetween={15}
        navigation={true}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className={styles.imgProduct}>
            <img
              src={img}
              alt="Produto"
              className="w-100 h-100 object-fit-cover"
            />
            <Button
              variant="danger"
              size="sm"
              className={`${styles.btnImg}`}
              onClick={() => handleRemoveImage(idx)}
            >
              Remover
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal show={showCropper} onHide={() => setShowCropper(false)} centered>
        <Modal.Header>
          <Modal.Title>Ajustar Imagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageToCrop && (
            <div className={`${styles.containerCropper}`}>
              <Cropper
                ref={cropperRef}
                src={imageToCrop}
                style={{ height: 400, width: "100%" }}
                aspectRatio={1}
                guides={false}
                viewMode={1}
                zoomTo={zoom}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
              />
              <div className="mt-3">
                <Slider
                  min={0}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e as number)}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCropper(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCropSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Imagens</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
};

export default ImageCarousel;
