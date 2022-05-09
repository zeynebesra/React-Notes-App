import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNote } from "../context/Note";
import { v4 as uuidv4 } from "uuid";

export default function EditModal({ setAddModal }) {
  const { notes, setNotes } = useNote();
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);

  const cancelButtonRef = useRef(null);

  const addNote = () => {
    const id = uuidv4();
    notes.push({
      id: id,
      title: title,
      text: text,
    });
    setNotes([...notes]);
    setAddModal(false);
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => console.log("onclose")}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <form className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="my-4">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="username"
                      >
                        Başlık
                      </label>
                      <input
                        className="text-title"
                        id="username"
                        type="text"
                        value={title == null ? "" : title}
                        placeholder="Başlık giriniz"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="text"
                      >
                        İçerik
                      </label>
                      <textarea
                        className="text-text"
                        id="text"
                        type="text"
                        rows={5}
                        value={text == null ? "" : text}
                        placeholder="Notunuzu giriniz"
                        onChange={(e) => setText(e.target.value)}
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => addNote()}
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setAddModal(false)}
                  ref={cancelButtonRef}
                >
                  İptal
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
