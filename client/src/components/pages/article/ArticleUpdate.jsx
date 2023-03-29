import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { FileInput, Textarea, TextInput } from "../../layout/form";
import { useNavigate } from "react-router-dom";
import { get, put } from "../../../hooks/useArticleApi";

const ArticleUpdate = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const { form, onChange } = useForm({});
  const nav = useNavigate();
  const { id } = useParams();

  const validateForm = () => {
    let { title, content } = form;

    if (!title) {
      form.title = article.title;
    }
    if (!content) {
      form.content = article.content;
    }
  };

  const getArticle = async () => {
    await get(id)
      .then((data) => setArticle(data))
      .catch((error) => console.log(error));
  };

  const saveArticle = async (e) => {
    e.preventDefault();
    validateForm();

    await put(id, form)
      .then((saved) => {
        if (saved) nav("/articles");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    getArticle();
    setLoading(false);
  }, [id]);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <div className="card">
          <h1>Editar artículo</h1>
          <p>Formulario para editar un artículo</p>

          <form method="POST" className="form" onSubmit={saveArticle}>
            <div className="form-group">
              <TextInput
                name="title"
                label="Título"
                onChange={onChange}
                value={article.title}
              />
              <Textarea
                name="content"
                label="Descripción"
                onChange={onChange}
                value={article.content}
              />
              <FileInput label="Imagen" image={article.image} />
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ArticleUpdate;
