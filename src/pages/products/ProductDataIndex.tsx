import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Requests } from "../../requests/Requests"

import SocialLinks from "../SocialLinks"
import NotFound from "../NotFound"
import MainComponentLayout from "../../layouts/MainComponentLayout"
import ProductDataShow from "./show_pages/ProductDataShow"

export interface ProductType {
	id: number
	user_id: string
	type: string
	title: string
	description: string
	customer_message: string
	image_url: string
}

const ProductDataIndex: React.FC = () => {
	const { productId } = useParams()
	const [productData, setProductData] = useState<ProductType>({
		id: 0,
		user_id: "",
		type: "",
		title: "",
		description: "",
		customer_message: "",
		image_url: "",
	})
	const [error, setError] = useState<boolean>(false)

	const fetchProductData = async () => {
		try {
			const response = await Requests.GET(
				`/subapps/mycuttingboard/product/${productId}`,
				false,
				false
			)
			if (response.status === 200) {
				const data = await response.data
				setProductData(data)
			} else {
				setError(true)
			}
		} catch (error) {
			setError(true)
		}
	}

	useEffect(() => {
		fetchProductData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productId])

	return (
		<>
			<MainComponentLayout>
				{error ? <NotFound /> : <ProductDataShow productData={productData} />}{" "}
			</MainComponentLayout>
			<SocialLinks />
		</>
	)
}

export default ProductDataIndex
