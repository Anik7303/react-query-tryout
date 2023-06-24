import { FormEventHandler, useRef } from "react";

function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (ref.current && ref.current.value) {
      console.log(ref.current.value);
      ref.current.value = "";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input ref={ref} type="text" className="form-control" />
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
}

export default TodoForm;
