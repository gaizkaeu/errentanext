import { Link } from "next-intl";

const Footer = () => {
  return (
    <footer className="mt-8 p-4 rounded-lg shadow md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a
          href="https://elizaasesores.com/"
          className="flex items-center mb-4 sm:mb-0"
        >
          <p className="self-center text-2xl font-semibold whitespace-nowrap ">
            ERRENTA{" "}
            <span className="font-extralight text-xl">by Eliza Asesores</span>
          </p>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Acerca de Nosotros
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacidad
            </a>
          </li>
          <li>
            <Link href="" lang="es">ES</Link>|
            <Link href="" lang="en">EN</Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="https://elizaasesores.com" className="hover:underline">
          Eliza Asesores S.L.
        </a>
        . Todos los derechos reservados. - #
      </span>
    </footer>
  );
}

export { Footer }