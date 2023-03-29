import React from "react";
import { useForm } from "../../../hooks/useForm";
import { FileInput, Textarea, TextInput } from "../../layout/form";
import { useNavigate } from "react-router-dom";
import { post } from "../../../hooks/useArticleApi";

const ArticleCreate = () => {
  const { form, onChange } = useForm({});
  const nav = useNavigate();

  const saveArticle = async (e) => {
    e.preventDefault();

    await post(form).then((saved) => {
      if (saved) nav("/articles");
    }).catch(error => console.log(error));
  };

  return (
    <div className="card">
      <h1>Crear artículo</h1>
      <p>Formulario para crear un nuevo artículo</p>

      <form method="POST" className="form" onSubmit={saveArticle}>
        <div className="form-group">
          <TextInput name="title" label="Título" onChange={onChange} />
          <Textarea name="content" label="Descripción" onChange={onChange} />
          <FileInput label="Imagen" />
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default ArticleCreate;
