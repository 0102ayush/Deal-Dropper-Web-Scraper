"use client";
import { useRouter } from 'next/navigation';
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent } from "react";
import { useState } from "react";


const isValidAmazonProductLink = (url : string) => {
    try{
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        if(hostname.includes('amazon.com') || hostname.includes('amazon.in') || hostname.includes('amazon.') ||  hostname.includes('amzn.')){
            return true;
        }
    
    } catch (error) {
        return false;
    }

     return false;
}
const SearchBar = ( ) => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductLink(searchPrompt);

    if(!isValidLink){
        alert('Please enter a valid Amazon product link'); 
    }

    try{
        setIsLoading(true);
        const productId = await scrapeAndStoreProduct(searchPrompt);
        if (productId) {
          // Redirect to the product page using the returned productId
          router.push(`/products/${productId}`);
        } else {
          alert('Failed to scrape and store the product.');
        }
    }catch(error){
        console.log(error);
    } finally {
        setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter Product link"
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-btn" disabled = {searchPrompt === '' }>
        {
        isLoading ? 'Searching...' : 'Search'
        }
      </button>
    </form>
  );
};

export default SearchBar;
