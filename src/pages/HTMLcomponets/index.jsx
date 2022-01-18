import tw from 'twin.macro';

export const PrincipalContainer = tw.div`
w-full
flex
flex-col
mt-32
font-family[Itim, cursive]
`;

export const CategoriesContainer = tw.div`
  w-full  
  fixed
  top-14
  flex
  justify-center
  sm:w-5/6
`;

export const MainContainer = tw.main`
  w-screen
  flex
  flex-col
  content-center
  sm:w-5/6
  sm:mx-auto
`;

export const NavCategories = tw.div`
  bg-white
  w-full
  flex
  content-center
  justify-center
  border-b-0
  px-3
  m-1.5
  z-20
  text-gray-600
  sm:mx-auto
  sm:left-auto
  text-gray-600 
  sm:h-10
  font-family[Itim, cursive]
`;
