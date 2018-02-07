import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ContactoStore from './store';
import RedStore from './redStore';
import List, { ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import UpdateIcon from 'material-ui-icons/Add';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';


@observer
class ContactoList extends Component{
    static get defaultProps(){
        return{
            store: ContactoStore,
            red_store: RedStore
        }
    }

    componentDidMount(){
        console.log(this.props)
        this.props.store.all();
    }

    handleContactos(page){
        this.props.store.all(page)
    }

    deleteContacto(id){
        var deletePromise = this.props.store.delete(id);
        var self = this;
        deletePromise.then(function(res){
                var page = self.props.store.page;
                self.props.store.all(page);
            }
        )
    }

    updateContacto(id){
        var updatePromise = this.props.store.update(id);
        var self = this;
        updatePromise.then(()=>{
            self.props.store.all();
            self.props.store.uModalopen = false;
        })
    }

    createContacto(id){
        var createPromise = this.props.store.create();
        var self = this;
        createPromise.then(()=>{
            self.props.store.all();
            self.props.store.uModalopen = false;
            self.props.store.is_create = false;
        })
    }

    handleClose(){
        this.props.store.cModalopen = false;
    }

    handleOpen(id){
            this.props.red_store.contacto_id = id
            this.props.red_store.all()
            this.props.store.get(id)
            setTimeout(()=>{
            this.props.store.cModalopen = true;
            },5000)

    }

    handleChange(event){
        this.props.store[event.target.name]=event.target.value;
    }


    handleCloseUpdate(){
        this.props.store.uModalopen = false;
        this.props.store.is_create = false;
    }

    handleOpenUpdate(id){
        this.props.store.titulo="Actualizar contacto"
        this.props.store.get(id).then(()=>{
            this.props.store.uModalopen = true;
        })
    }

    handleOpenCreate(){
        console.log(this.props.store.url)
        this.props.store.is_create=true;
        this.props.store.id = null;
        this.props.store.nombre = '';
        this.props.store.apellidos = '';
        this.props.store.direccion = '';
        this.props.store.telefono = '';
        this.props.store.titulo = 'Añadir contacto'
        this.props.store.uModalopen = true;

    }


    render(){
        return(
            <div>
                <Dialog
                    open={this.props.store.cModalopen}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.store.nombre + ' '+ this.props.store.apellidos}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <br />
                            <b>Detalles del contacto</b>
                            <b>Direccion</b>: {this.props.store.direccion}<br />
                            <Icon>phone</Icon>{this.props.store.telefono}<br /><br />
                            <b>Redes sociales</b>
                            {
                                this.props.red_store.objects.map((redsocial)=>{
                                    return(
                                        <p>{redsocial.nombre}</p>
                                    )
                                })
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.props.store.uModalopen}
                    onClose={this.handleCloseUpdate.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.store.titulo}</DialogTitle>
                    <DialogContent>

                    <TextField
                        required
                        fullWidth
                        name="nombre"
                        label="Nombre"
                        value={this.props.store.nombre}
                        onChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <br />

                    <TextField
                        required
                        fullWidth
                        name="apellidos"
                        label="Apellidos"
                        value={this.props.store.apellidos}
                        onChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <br />

                    <TextField
                        required
                        fullWidth
                        name="direccion"
                        label="Direccion"
                        value={this.props.store.direccion}
                        onChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <br />

                    <TextField
                        required
                        fullWidth
                        name="telefono"
                        label="Telefono"
                        value={this.props.store.telefono}
                        onChange={this.handleChange.bind(this)}
                    />

                    </DialogContent>
                    <DialogActions>
                    {this.props.store.is_create?
                        <Button onClick={this.createContacto.bind(this)} color="primary">
                            Guardar
                        </Button>
                        :
                        <Button onClick={this.updateContacto.bind(this, this.props.store.id)} color="primary">
                            Guardar
                        </Button>
                    }
                        <Button onClick={this.handleCloseUpdate.bind(this)} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>


            <Button variant="fab" color="secondary" aria-label="add" onClick={this.handleOpenCreate.bind(this)}>
            <AddIcon />
            </Button>
            <Grid container>
                <Grid item xs={12}>
                    <List style={{maxHeight: '900px', overflow: 'auto'}}>
                    {
                        this.props.store.objects.map((contacto)=>{
                            return(
                                <ListItem key={contacto.id} button onClick={this.handleOpen.bind(this, contacto.id)}>
                                    <ListItemText
                                        primary={contacto.apellidos + ', '+contacto.nombre}
                                    />
                                    <ListItemText
                                        primary={contacto.telefono}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Borrar" onClick={this.deleteContacto.bind(this, contacto.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="Agregar" onClick={this.handleOpenUpdate.bind(this, contacto.id)}>
                                            <Icon>mode_edit</Icon>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                    </List>
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default ContactoList;
