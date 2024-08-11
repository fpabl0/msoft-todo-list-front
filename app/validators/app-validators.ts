
const required = () => {
  return (v: string): string | null => {
    if (v.trim() === "") return "Este campo es requerido";
    return null;
  };
};

const email = () => {
  return (v: string): string | null => {
    const regex = new RegExp("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$");
    if (!regex.test(v)) {
      return "Debe ser un correo electrónico válido";
    }
    return null;
  };
};

const minLength = (len: number) => {
  return (v: string): string | null => {
    if (v.length < len) {
      return `Debe contener al menos ${len} caracteres.`;
    }
    return null;
  };
};


export default {
  required,
  email,
  minLength,
};