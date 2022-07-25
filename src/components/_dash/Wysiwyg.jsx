import {Editor} from "@tinymce/tinymce-react";

const Wysiwyg = (props) => {
  return (
    <div className='mt-4'>
      <Editor
        onInit={(evt, editor) => (props.editorRef.current = editor)}
        initialValue={
          props.initialValue
            ? props.initialValue
            : "<p>This is the initial content of the editor.</p>"
        }
        init={{
          height: 500,
          menubar: false,
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
};

export default Wysiwyg;
