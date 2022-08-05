import { Dialog, Transition } from '@headlessui/react';
import { PhotographIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Image from 'next/image';
import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useRef,
  useState,
} from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import { useController, UseControllerProps } from 'react-hook-form';

const ImageSelector = <T,>({ control, name }: UseControllerProps<T>) => {
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [scale, setScale] = useState<number>(1.5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { field } = useController({
    control,
    name,
  });
  const ref = useRef<AvatarEditor>(null);
  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDropAccepted,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
  });
  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };
  const getCroppedImage = () => {
    const image = ref.current?.getImage();
    const canvas = document.createElement('canvas');
    canvas.width = 156;
    canvas.height = 156;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image!, 0, 0, 156, 156);

    field.onChange(canvas.toDataURL('image/png'));
    closeModal();
  };
  return (
    <>
      <div
        className={classNames(
          'relative grid aspect-square w-40 content-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 hover:cursor-pointer hover:bg-slate-100',
          isDragAccept && 'bg-blue-200'
        )}
        {...getRootProps()}
      >
        {field.value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={field.value as string}
            className="absolute top-0 left-0 block h-full w-full"
            alt=""
          />
        )}
        <div className="z-5 relative text-center">
          <PhotographIcon className="mx-auto h-10 w-10 text-slate-400" />
          <p className="text-sm text-slate-400">画像を選択</p>
        </div>
        <input className="hidden" {...getInputProps()} type="file" />
      </div>
      {field.value && (
        <button
          className="mt-2 text-sm text-slate-600"
          onClick={() => field.onChange('')}
        >
          削除
        </button>
      )}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedImage && (
                    <div>
                      <AvatarEditor
                        ref={ref}
                        image={selectedImage}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={125}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        rotate={0}
                      />
                      <input
                        type="range"
                        min={1}
                        max={2}
                        step={0.1}
                        onChange={handleScaleChange}
                        defaultValue={1.5}
                      />
                    </div>
                  )}
                  <div className="flex justify-end space-x-2"></div>
                  <button
                    className="rounded-full bg-slate-200 px-3 py-2"
                    onClick={closeModal}
                  >
                    閉じる
                  </button>
                  <button
                    className="rounded-full bg-blue-500 px-3 py-2 text-white"
                    onClick={getCroppedImage}
                  >
                    保存
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ImageSelector;
