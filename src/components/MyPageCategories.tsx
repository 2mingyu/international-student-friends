interface MyPageCategoriesProps {
  categories: { [key: string]: string[] };
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function MyPageCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: MyPageCategoriesProps) {
  return (
    <div className="w-1/3 border-r p-3">
      {Object.entries(categories).map(([category, subcategories]) => (
        <div key={category} className="mb-6">
          <h3 className="mb-1 text-lg font-bold">{category}</h3>
          <ul>
            {subcategories.map((subcategory) => (
              <li
                key={subcategory}
                className={`cursor-pointer py-1 ${selectedCategory === subcategory ? "font-semibold" : ""}`}
                onClick={() => onSelectCategory(subcategory)}
              >
                {subcategory}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
