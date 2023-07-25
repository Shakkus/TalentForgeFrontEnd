import { useForm, ValidationError } from "@formspree/react";

const CompanyContact = () => {
  const [state, handleSubmit] = useForm("xoqovygo");

  if (state.succeeded) {
    return <p>Correo electrónico enviado, pronto te daremos una respuesta!</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-200 rounded-lg shadow-lg my-10 w-2/3">
      <h2 className="text-3xl font-bold mb-6 text-[#7C38CD]">Contáctanos</h2>
      <div className="contact-info mb-6 text-center">
        <p className="text-lg mb-2 px-5">Teléfono: 666-666-6666</p>
        <p className="text-lg mb-2 px-5">Correo electrónico: talentforge.dev@gmail.com</p>
        <p className="text-lg mb-2 px-5">Dirección: Amongas #666, Argentina, Bogota</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
        </div>

        <label
          htmlFor="subject"
          className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
        >
          Asunto:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <label
          htmlFor="message"
          className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
        >
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          type="submit"
          className="my-5 w-full py-3 bg-[#7C38CD] text-white font-semibold rounded-lg shadow-md hover:bg-[#8947d8] transition-colors"
          disabled={state.submitting}
        >
          Enviar mensaje
        </button>
      </form>
      <p className="mt-6 text-lg">Horarios de atención: Lunes a Viernes de 9:00 AM a 5:00 PM</p>
    </div>
  );
};

export default CompanyContact;
