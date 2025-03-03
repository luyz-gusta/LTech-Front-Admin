/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@tinymce/tinymce-react";
import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface TextAreaEditorProps {
  label: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  trigger: UseFormTrigger<any>;
  setValue: UseFormSetValue<any>;
}
export default function TextAreaEditor({
  name,
  label,
  register,
  rules,
  error,
  trigger,
  setValue,
}: TextAreaEditorProps) {
  return (
    <div className="col-12 col-md-12 mb-4">
      <label htmlFor={name} className="form-label fw-medium">
        {label}
      </label>
      <Editor
        apiKey="tqw9pl6nt575q89nul09v4nn3zugt3ae2p31ehyvpi6xivmp"
        initialValue=""
        {...register(name, rules)}
        id={name}
        onEditorChange={(e) => {
          setValue(name, e);
          trigger(name);
        }}
        init={{
          height: 500,
          max_height: 500,
          min_height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
      />
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
