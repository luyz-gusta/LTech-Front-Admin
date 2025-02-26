/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "rc-slider";
import React, { useCallback, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import Cropper from "react-cropper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageCarousel: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const swiperRef = useRef<any>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback(async () => {
    if (!imageToCrop || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageToCrop;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
        }
      }, "image/jpeg");
    });
  }, [imageToCrop, croppedAreaPixels]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
        setShowModal(false);
        setShowCropper(true);
        if (swiperRef.current) {
          swiperRef.current.swiper.update();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg();
    if (croppedImage) {
      setImages((prev) => [...prev, croppedImage]);
    }
    setShowCropper(false);
    setImageToCrop(null);
    if (swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  };

  return (
    <div className="image-carousel">
      <div className="d-flex align-items-center justify-content-between w-100 mt-3">
        <h5>Imagens do Produto</h5>
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

      <Modal show={showCropper} onHide={() => {}} centered>
        <Modal.Header>
          <Modal.Title>Ajustar Imagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageToCrop && (
            <div className={`${styles.containerCropper}`}>
              <Cropper
                ref={imageToCrop}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <div className="mt-4">
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  // onChange={setZoom}
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
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageCarousel;
