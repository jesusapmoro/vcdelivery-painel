import { Category } from "@/Types/Category";
import { Product } from "@/Types/Product";
import { Box, Button, Dialog, DialogContent, DialogTitle, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (event: FormEvent<HTMLFormElement>) => void;
    categories: Category[];
    product?: Product;
    disabled?: boolean;
}

export const ProductEditDialog = ({ open, onClose, onSave, categories, product, disabled } : Props) => {

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(event);
    }

    return(
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="imgFiel">Imagem</InputLabel>
                        <Input
                            id="imgField"
                            name="image"
                            type="file"
                            fullWidth//pega a tela toda
                            disabled={disabled}
                            inputProps={{ accept: 'image/' }}//aceita todos os tipos de imagem
                        />
                    </Box >
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="nameField">Nome</InputLabel>
                        <TextField
                            id="nameFiel"
                            variant="standard"
                            name="name"
                            defaultValue={product?.name}//valor padrão deixa fezer alteração
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="priceFiel">Preço (em R$)</InputLabel>
                        <TextField
                            id="priceFiel"
                            variant="standard"
                            type="number"
                            name="price"
                            defaultValue={product?.price}//valor padrão deixa fezer alteração
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="descField">Descrição</InputLabel>
                        <TextField
                            id="decFiel"
                            variant="standard"
                            name="description"
                            defaultValue={product?.description}//valor padrão deixa fezer alteração
                            multiline
                            rows={4}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{mb:2}}>
                        <InputLabel variant="standard" htmlFor="catFiel">Categoria</InputLabel>
                        <Select
                            id="catFiel"
                            variant="standard"
                            name="category"
                            defaultValue={product?.category.id || categories[0]?.id}
                            required
                            fullWidth
                            disabled={disabled}
                        >
                            {categories.map(item => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end '}}>
                        <Button disabled={disabled} onClick={onClose}>Cancelar</Button>
                        <Button disabled={disabled} type="submit">Salvar</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}