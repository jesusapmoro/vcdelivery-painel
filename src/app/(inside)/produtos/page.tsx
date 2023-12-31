"use client";

import { Category } from "@/Types/Category";
import { Order } from "@/Types/Order";
import { OrderStatus } from "@/Types/OrderStatus";
import { Product } from "@/Types/Product";
import { OrderItem } from "@/components/OrderItem";
import { ProductEditDialog } from "@/components/ProductEditDialog";
import { ProductTableItem } from "@/components/ProductTableItem";
import { ProductTableSkelecton } from "@/components/ProductTableSkeleton";
import { api } from "@/libs/api";
import { dateFormat } from "@/libs/dateFormat";
import { Refresh, Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    //modal para confirmar o deletar do produto
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    //state que vai armazenar o produto que vai ser deletado
    const [productToDelete, setProductToDelete] = useState<Product>();
    //state para desabilitar os boton delete e edit
    const [loadingDelete, setLoadingDelete] = useState(false);

    //state modal ProductEditDialog edit e novo produto
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product>();
    const [loadingEditDialog, setLoadingEditDialog] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        setProducts(await api.getProducts());
        setCategories( await api.getCategories());
        setLoading(false);
    }

    // Delete Product
    const handleDeleteProduct = (product: Product) => {
        setProductToDelete(product);//armazeno o produto id
        setShowDeleteDialog(true);//mostrar o modal
    }

    const handleConfirmDelete = async () => { 
        if(productToDelete) {
            setLoadingDelete(true);//habilita o modal
            await api.deleteProduct(productToDelete.id);
            setLoadingDelete(false);//desabilita o modal
            setShowDeleteDialog(false);
            getProducts();//carregar os produtos na tela
        }
    }

    //New/Edit Product
    const handleNewProduct = () => {
        setProductToEdit(undefined);//tira tudo da tela de edição
        setEditDialogOpen(true);//abre o dialog de edição
    }

    const handleEditProduct = (product: Product) => {
        setProductToEdit(product);
        setEditDialogOpen(true);
    }

    const handleSaveEditDialog =async (event: FormEvent<HTMLFormElement>) => {
        let form= new FormData(event.currentTarget);//formData(p/enviar image e texto)//event.currentTarget(pega os elementos do formulário)

        setLoadingEditDialog(true);
        if(productToEdit) {
            form.append('id', productToEdit.id.toString());//antes de enviar tenho que pegar o id do produto
            await api.updateProduct(form);
        } else {
            await api.createProduct(form);
        }
        setLoadingEditDialog(false);
        setEditDialogOpen(false);

        getProducts();
    }
     

    return(
        <>
            <Box sx={{ my: 3 }}>
                
                <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 2 }}>Produtos</Typography>
                    <Button onClick={handleNewProduct}>Novo Produto</Button>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 50, display: { xs: 'none', md: 'table-cell' }}}>ID</TableCell>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Preço</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Categoria</TableCell>
                            <TableCell sx={{ width: { xs: 50, md: 130 } }}>Açoes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && 
                            <>
                                <ProductTableSkelecton />
                                <ProductTableSkelecton />
                                <ProductTableSkelecton />
                            </>
                        }
                        {!loading && products.map(item => (
                            <ProductTableItem 
                                key={item.id}
                                item={item}
                                onEdit={handleEditProduct}
                                onDelete={handleDeleteProduct}
                            />
                        ))}
                    </TableBody>
                </Table>
                
                <Dialog open={showDeleteDialog} onClose={() => !loadingDelete ? setShowDeleteDialog(false) : null}>
                    <DialogTitle>Tem certez que deseja deletar este Produto?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Não é possivel voltar atrás após confirmar esta ação.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={loadingDelete} onClick={() => setShowDeleteDialog(false)}>Não</Button>
                        <Button disabled={loadingDelete} onClick={handleConfirmDelete}>Sim</Button>
                    </DialogActions>
                </Dialog>

                <ProductEditDialog 
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    onSave={handleSaveEditDialog}
                    disabled={loadingEditDialog}
                    product={productToEdit}
                    categories={categories}
                />
            </Box>
        </>
    );
}

export default Page;