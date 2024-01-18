import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { CgUnavailable } from 'react-icons/cg';
// import ProductCard from '@/components/layout/products/ProductCard';
const ProductCard = dynamic(() =>
  import('@/components/layout/products/ProductCard')
);
import { client } from '@/lib/client';
import CardSkeleton from '@/components/layout/CardSkeleton';
// import Breadcrumb from '@/components/layout/Breadcrumb';
const Breadcrumb = dynamic(() => import('@/components/layout/Breadcrumb'));
import { m, AnimatePresence } from 'framer-motion';
// import LazyMotions from '@/components/LazyMotions';
const LazyMotions = dynamic(() => import('@/components/LazyMotions'));
import { useRouter } from 'next/router';

import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from 'react-icons/tb';

// sizes for filtering search
const sizes = [
  { title: 'extra Small', value: 'XS' },
  { title: 'Small', value: 'SM' },
  { title: 'Medium', value: 'M' },
  { title: 'Large', value: 'L' },
  { title: 'Extra Large', value: 'XL' },
  { title: 'Double Extra Large', value: 'XXL' },
];
const loading = [1, 2, 3, 4, 5, 6, 7, 8];
function CategoryProductContaier({ id, products }) {
  const { query } = useRouter();
  const { name } = query;
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sizesCheked, setSizesCheked] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [startSearch, setStartSearch] = useState('');
  const [priceMinMax, setPriceMinMax] = useState({
    min: 0,
    max: 1000000,
  });
  const GetData = async () => {
    const QueryFc = () => {
      const q = sizesCheked.map(
        (query, i) =>
          `"${query}" in sizes ${i + 1 !== sizesCheked.length ? '|| ' : ''}`
      );
      return q.join('');
    };
    const onSaleQuery = onSale ? ' && onSale.isOnSale == true' : '';
    const searchQuery = startSearch
      ? ' && (title match $searchStr || tags[] match $searchStr)'
      : '';
    const sizeQuery = sizesCheked.length > 0 ? ` && (${QueryFc()})` : '';
    const { min, max } = priceMinMax;
    const data = await client.fetch(
      `*[_type == "product" && category._ref == $id${onSaleQuery} && price >= $min && price <= $max${searchQuery}${sizeQuery}]`,
      { id, onSale, searchStr, sizesCheked, min, max }
    );
    return data;
  };
  const { data, isLoading, isError } = useQuery(
    ['getCtaegoryProduct', onSale, startSearch, sizesCheked, id, priceMinMax],
    GetData,
    {
      refetchOnWindowFocus: false,
      initialData: products,
    }
  );
  // function to add f sizes
  const FcSizes = (e) => {
    const findSize = sizesCheked.find((size) => size === e.target.value);
    if (findSize) {
      const removeSize = sizesCheked.filter((size) => size !== e.target.value);
      setSizesCheked(removeSize);
    } else {
      setSizesCheked((pre) => [...pre, e.target.value]);
    }
  };
  return (
    <section className="pt-[152px]">
      <div className="w-full my-6">
        <Breadcrumb />
      </div>
      <div className="sideBarController w-full my-6">
        <button
          className="flex items-center gap-3"
          onClick={() => setIsFilterOpen((pre) => !pre)}
        >
          {isFilterOpen ? (
            <TbLayoutSidebarLeftCollapse className="w-7 h-7" />
          ) : (
            <TbLayoutSidebarLeftExpand className="w-7 h-7" />
          )}
          <span>{isFilterOpen ? 'Close Filter Bar' : 'Open Filter Bar'}</span>
        </button>
      </div>
      <LazyMotions>
        <div className="flex w-fulll gap-x-4 gap-y-8   mb-16 flex-col lg:flex-row">
          {/*sideBar*/}

          <AnimatePresence initial={false}>
            {isFilterOpen && (
              <m.section
                animate={{ x: 0 }}
                initial={{ x: 0 }}
                exit={{ x: -500 }}
                className="w-fit self-start  lg:py-6 lg:w-fulll flex lg:flex-col  items-center lg:items-start gap-3 flex-wrap"
              >
                <div className="w-fit whitespace-nowrap flex items-center gap-3 btn">
                  <label htmlFor="Sale" className=" capitalize">
                    on Sale only
                  </label>
                  <input
                    id="Sale"
                    type="checkbox"
                    className="toggle checked:outline-secondary-alt checked:bg-secondary-alt toggle-error"
                    checked={onSale}
                    onChange={() => setOnSale((pre) => !pre)}
                  />
                </div>
                <div className="range-search flex items-center ">
                  <input
                    type="number"
                    min={'0'}
                    max={'1000000'}
                    placeholder="min"
                    className="input w-full max-w-[90px] focus:outline-secondary-alt rounded-lg border border-solid border-black input-primary rounded-sm"
                    onChange={(e) =>
                      setPriceMinMax((pre) => ({
                        ...pre,
                        min: +e.target.value,
                      }))
                    }
                  />
                  <div className="h-1 max-w-[15px] w-full bg-black"></div>
                  <input
                    type="number"
                    min={'5'}
                    max={'1000000'}
                    placeholder="max $"
                    className="input w-full focus:outline-secondary-alt max-w-[90px] rounded-lg border border-solid border-black input-primary rounded-sm"
                    onChange={(e) =>
                      setPriceMinMax((pre) => ({
                        ...pre,
                        max: e.target.value ? +e.target.value : 1000000,
                      }))
                    }
                  />
                </div>
                <div className=" flex items-center gap-2">
                  <input
                    data-theme="emerald"
                    type="text"
                    placeholder="Type here"
                    className="input w-full focus:outline-secondary-alt max-w-xs border rounded-lg border-solid border-black input-primary rounded-sm"
                    onChange={(e) => setSearchStr(`${e.target.value}*`)}
                  />
                  <BiSearchAlt2
                    className="w-7 h-7 cursor-pointer"
                    onClick={() => setStartSearch(searchStr)}
                  />
                  {/* the idea is that evreytime the search clicked it changes value of the state
          startSearch which run the query again resulting in new data */}
                </div>
                {products[0]?.sizes && (
                  <div className="sizes lg:max-w-[200px] flex items-center gap-y-2 gap-3 flex-wrap">
                    <p className="w-full capitalize">choose Size:</p>
                    {sizes.map((size) => (
                      <div
                        className="form-control"
                        key={size.value + size.title}
                      >
                        <label className="label cursor-pointer flex items-center gap-2">
                          <span className="label-text uppercase">
                            {size.value}
                          </span>
                          <input
                            type="checkbox"
                            checked={sizes.find((size) => size === size.value)}
                            className={`checkbox checked:outline-secondary-alt checked:bg-secondary-alt checkbox-natural border-2 `}
                            value={size.value}
                            onClick={FcSizes}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </m.section>
            )}
          </AnimatePresence>

          {/*Products*/}
          <m.section className="flex-grow transition-all duration-500 ease-linear grid grid-cols-1 gap-2 gap-y-4 xs:gap-y-6 xs:gap-3 xs:grid-cols-2 md:grid-cols-3 ">
            {!isLoading && !isError ? (
              data.length ? (
                data.map((p, i) => (
                  <ProductCard key={i + 231 + 'yyy'} product_data={p} />
                ))
              ) : (
                <p className="col-span-full text-lg row-span-full  h-5 gap-4 capitalize flex items-center justify-center py-12 px-3">
                  <p className="w-fit px-4 rounded py-4 shadow-md flex items-center gap-3">
                    <CgUnavailable className="w-7 h-7" />
                    <span>No item has been found</span>
                  </p>
                </p>
              )
            ) : (
              loading.map((component) => (
                <CardSkeleton key={component + '****'} />
              ))
            )}
          </m.section>
        </div>
      </LazyMotions>
    </section>
  );
}

export default CategoryProductContaier;
