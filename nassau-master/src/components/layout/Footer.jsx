import { client } from "@/lib/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BsFacebook, BsTwitter, BsTiktok, BsInstagram } from "react-icons/bs";

function Footer() {
  const [hydrate, setHydrate] = useState(false);
  const getCtaegories = async () => {
    const categories = await client.fetch('*[_type == "catagories"]');
    const social = await client.fetch('*[_type == "social_media"][0]');
    const data = { categories, social };
    return data;
  };
  const { data, isLoading, isError } = useQuery(["footer"], getCtaegories, {
    refetchOnWindowFocus: false,
    cachTime: 300000,
    refetchOnMount: false,
    // refetchOnReconnect: false,
  });
  useEffect(() => {
    if (window !== "undefiend") {
      setHydrate(true);
    }
  }, []);
  return (
    <>
      {hydrate && (
        <footer className='px-4 divide-y bg-primary text-white'>
          <div className='container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0'>
            <div className='lg:w-1/3'>
              <Link
                rel='noopener noreferrer'
                href='#'
                className='flex justify-center space-x-3 lg:justify-start'
              >
                <div className='flex items-center justify-center w-12 h-12 rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 32'
                    fill='currentColor'
                    className='flex-shrink-0 w-5 h-5 rounded-full'
                  >
                    <path d='M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z'></path>
                  </svg>
                </div>
                <span className='self-center text-2xl font-semibold'>
                  Nassau
                </span>
              </Link>
            </div>
            <div className='grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4'>
              {/*Company Info*/}
              <div className='space-y-3'>
                <h3 className='uppercase'>Company info</h3>
                <ul className='space-y-1 capitalize'>
                  {/* <li>
                    <Link href="/shipping_info">
                      <p>shipping info</p>
                    </Link>
                  </li> */}
                  <li>
                    <Link href='/return_policy'>
                      <p>return</p>
                    </Link>
                  </li>
                  <li>
                    <Link href='/terms_conditions'>
                      <p>terms & conditions</p>
                    </Link>
                  </li>
                </ul>
              </div>
              {/*categories*/}
              <div className='space-y-3'>
                <h3 className='uppercase'>categories</h3>
                <ul className='space-y-1 capitalize'>
                  {!isLoading &&
                    !isError &&
                    data.categories.slice(0, 3).map((e, i) => (
                      <li key={i + "djsqldsjdsdlsdqldbcbvnwwwwwww"}>
                        <Link
                          href={`/category/${e._id}?name=${e.category_name}`}
                        >
                          <p>{e.category_name}</p>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/*help & support*/}
              <div className='space-y-3'>
                <h3 className='uppercase'>Help & support</h3>
                <ul className='space-y-1 capitalize'>
                  <li>
                    <Link href='/about'>
                      <p>about Us</p>
                    </Link>
                  </li>
                  <li>
                    <Link href='/contact'>
                      <p>Contact Us</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='space-y-3'>
                <div className='uppercase'>Social media</div>
                <div className='flex justify-start space-x-3'>
                  {!isLoading && !isError && data.social.facebook && (
                    <Link
                      rel='noopener noreferrer'
                      href={data.social.facebook}
                      title='Facebook'
                      className='flex items-center p-1'
                    >
                      <BsFacebook />
                    </Link>
                  )}
                  {!isLoading && !isError && data.social.twitter && (
                    <Link
                      rel='noopener noreferrer'
                      href={data.social.twitter}
                      title='Twitter'
                      className='flex items-center p-1'
                    >
                      <BsTwitter />
                    </Link>
                  )}
                  {!isLoading && !isError && data.social.instagram && (
                    <Link
                      rel='noopener noreferrer'
                      href={data.social.instagram}
                      title='Instagram'
                      className='flex items-center p-1'
                    >
                      <BsInstagram />
                    </Link>
                  )}
                  {!isLoading && !isError && data.social.tiktok && (
                    <Link
                      rel='noopener noreferrer'
                      href={data.social.tiktok}
                      title='Tiktok'
                      className='flex items-center p-1'
                    >
                      <BsTiktok />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='py-6 text-sm text-center '>
            © 2023 Nassau Co. All rights reserved.
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
