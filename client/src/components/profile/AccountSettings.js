import React from "react";
import MaskedInput from "react-text-mask";
import Avatar from "react-avatar-edit";
import RegExValidator from "../../common/RegExValidator";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css"
import ProfileDataService from "../../services/ProfileDataService";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FileStorageService from "../../services/FileStorageService";



class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userId: "",
      phoneId: "",
      firstName: "",
      lastName: "",
      gender: "",
      bio: "",
      playerComparison: "",
      shootingHand: "",
      phoneNumber: "",
      telephones: [],
      showPhoneInput: false,
      preview: "",
      imageId: "",
      fileStorageId: "",
      baseUrl: "",
      fqUrl: "",
      telephoneErrors: { phoneNumber: "" },
      nameErrors: { firstName: "", lastName: "" },
      profileErrors: { bio: "", playerComparison: "", shootingHand: "" },
      phoneNumberValid: false,
      telephoneValid: false,
      userAccountValid: false,
      firstNameValid: false,
      lastNameValid: false,
      nameValid: false,
      bioValid: false,
      playerComparisonValid: false,
      shootingHandValid: false,
      profileValid: false
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.user.id,
      userId: this.props.user.id
    })
    ProfileDataService.getById(this.props.user.id, this.getByIdSuccess, this.getByIdError)
  }

  getByIdSuccess = resp => {
    console.log(resp)
    const profileDataArr = resp.data.item;
    this.setState({
      ...profileDataArr,
      firstNameValid: profileDataArr.firstName ? true : false,
      lastNameValid: profileDataArr.lastName ? true : false,
      playerComparisonValid: profileDataArr.playerComparison ? true : false,
      bioValid: profileDataArr.bio ? true : false,
      shootingHandValid: profileDataArr.shootingHand ? true : false
    })
  }

  getByIdError = err => console.log(err)

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({
      [key]: val
    },
      () => {
        this.validateNameField(key, val)
        this.validateProfileField(key, val)
        this.validateTelephoneField(key, val)
      }
    );
  };

  validateTelephoneField = (fieldName, value) => {
    let fieldValidationErrors = this.state.telephoneErrors;
    let phoneNumberValid = this.state.phoneNumber;
    switch (fieldName) {
      case "phoneNumber":
        phoneNumberValid = RegExValidator.phoneNumberValidation(value);
        fieldValidationErrors.phoneNumber = phoneNumberValid;
        break;
      default:
        break;
    }
    this.setState(
      {
        telephoneErrors: fieldValidationErrors,
        phoneNumberValid: phoneNumberValid,
      },
      this.validateTelephoneForm
    );
  };

  validateTelephoneForm = () => {
    this.setState({
      telephoneValid: this.state.phoneNumberValid
    });
  };

  validateNameField = (fieldName, value) => {
    let fieldValidationErrors = this.state.nameErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length > 0 && value.length < 256;
        fieldValidationErrors.firstName = firstNameValid;
        break;
      case "lastName":
        lastNameValid = value.length > 0 && value.length < 256;
        fieldValidationErrors.lastName = lastNameValid;
        break;
      default:
        break;
    }
    this.setState(
      {
        nameErrors: fieldValidationErrors,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid
      },
      this.validateNameForm
    );
  };

  validateNameForm = () => {
    this.setState({
      nameValid:
        this.state.firstNameValid &&
        this.state.lastNameValid
    });
  };

  validateProfileField = (fieldName, value) => {
    let fieldValidationErrors = this.state.profileErrors;
    let bioValid = this.state.bioValid;
    let playerComparisonValid = this.state.playerComparisonValid;
    let shootingHandValid = this.state.shootingHandValid
    switch (fieldName) {
      case "playerComparison":
        playerComparisonValid = value.length > 0 && value.length < 256;
        fieldValidationErrors.playerComparison = playerComparisonValid;
        break;
      case "bio":
        bioValid = value.length > 0 && value.length < 256;
        fieldValidationErrors.bio = bioValid;
        break;
      case "shootingHand":
        shootingHandValid = value.length > 0 && value.length < 50;
        fieldValidationErrors.shootingHand = shootingHandValid;
        break;
      default:
        break;
    }
    this.setState(
      {
        profileErrors: fieldValidationErrors,
        playerComparisonValid: playerComparisonValid,
        bioValid: bioValid,
        shootingHandValid: shootingHandValid
      },
      this.validateProfileForm
    );
  };

  validateProfileForm = () => {
    this.setState({
      profileValid: this.state.playerComparisonValid
        && this.state.bioValid
        && this.state.shootingHandValid
    });
  };

  onClose = () => this.setState({ preview: null });

  onCrop = preview => this.setState({ preview });

  saveCroppedImage = evt => {
    evt.preventDefault();
    const url = this.state.preview;
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const data = new FormData();
        data.append("image", blob, "cropped-profile-image");
        if (this.state.imageId) {
          FileStorageService.updateFileStorage(
            this.state.imageId,
            data,
            this.updateFileStorageSuccess,
            this.updateFileStorageError
          );
        } else {
          FileStorageService.insertFileStorage(
            data,
            this.insertFileStorageSuccess,
            this.insertFileStorageError
          );
        }
      });
  };

  insertFileStorageSuccess = response => {
    console.log(response)
    this.setState({
      imageId: response.data.item,
      fileStorageId: response.data.item
    });
    ProfileDataService.insertProfileImage(this.state, this.insertProfileImageSuccess, this.insertProfileImageError)
  };

  insertFileStorageError = err => console.log(err);

  insertProfileImageSuccess = () => {
    ProfileDataService.getById(this.props.user.id, this.getByIdSuccess, this.getByIdError)
    NotificationManager.success("Save Successful!", "", 3000);
  }

  insertProfileImageError = err => console.log(err)

  updateFileStorageSuccess = () => {
    ProfileDataService.getById(
      this.state.userId,
      this.getByIdSuccess,
      this.getByIdError
    );
    NotificationManager.success("Save Successful!", "", 3000);
  };

  updateFileStorageError = error => {
    console.log(error);
    NotificationManager.error("Save Not Successful", "", 3000);
  };

  updatePerson = evt => {
    evt.preventDefault();
    ProfileDataService.updatePerson(this.props.user.id, this.state);
  };

  updateProfile = evt => {
    evt.preventDefault();
    ProfileDataService.updateProfile(this.props.user.id, this.state);
  };

  showPhoneInput = evt => {
    evt.preventDefault();
    this.setState({ showPhoneInput: true });
  };

  hidePhoneInput = evt => {
    evt.preventDefault();
    this.setState({ showPhoneInput: false });
  };

  saveTelephone = evt => {
    evt.preventDefault();
    ProfileDataService.insertTelephone(
      this.state,
      this.insertTelephoneSuccess,
      this.insertTelephoneError
    );
  };

  insertTelephoneSuccess = resp => {
    this.setState({ phoneId: resp.data.item });
    ProfileDataService.insertPersonPhone(
      this.state,
      this.insertPersonPhoneSuccess,
      this.insertPersonPhoneError
    );
  };

  insertTelephoneError = error => console.log(error);

  insertPersonPhoneSuccess = () => {
    ProfileDataService.getById(
      this.props.user.id,
      this.getByIdSuccess,
      this.getByIdError
    );
    this.setState({
      phoneNumber: "",
    });
  };

  insertPersonPhoneError = error => console.log(error);

  deletePhone = Id =>
    ProfileDataService.deletePersonPhone(
      Id,
      this.deletePersonPhoneSuccess,
      this.deletePersonPhoneError
    );

  deletePersonPhoneSuccess = () =>
    ProfileDataService.getById(
      this.props.user.id,
      this.getByIdSuccess,
      this.getByIdError
    );

  deletePersonPhoneError = error => {
    console.log(error);
    NotificationManager.error("Delete Not Successful", "", 3000);
  };

  render() {
    return (
      <div className="container-fluid flex-grow-1 container-p-y">
        <h1 className="py-3 mb-4 display-4">Account Settings</h1>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-profile">Profile</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-telephone">Phone Number</a>
              </div>
            </div>
            <NotificationContainer />
            <div className="col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="account-general">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label lead font-weight-normal">First Name:</label>
                      <input type="text" className={`form-control mb-1 ${this.state.firstNameValid ? "" : "is-invalid"}`} name="firstName" value={this.state.firstName ? this.state.firstName : ""} onChange={this.onChange} placeholder="Required" />
                      <div className="invalid-feedback">First Name is required</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label lead font-weight-normal">Last Name:</label>
                      <input type="text" className={`form-control mb-1 ${this.state.lastNameValid ? "" : "is-invalid"}`} name="lastName" value={this.state.lastName ? this.state.lastName : ""} onChange={this.onChange} placeholder="Required" />
                      <div className="invalid-feedback">Last Name is required</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label lead font-weight-normal">Gender:</label>
                      <select className="custom-select" name="gender" value={this.state.gender} onChange={this.onChange}>
                        <option value="">Optional</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Decline">Decline</option>
                      </select>
                    </div>
                    <button type="button" className="btn btn-primary mt-1" onClick={this.updatePerson} disabled={!this.state.nameValid}>Save Changes</button>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-profile">
                  <div className="card-body media align-items-center mt-3">
                    <img src={this.state.fqUrl}
                      alt=""
                      className="ui-w-100 rounded circle"
                    />
                    <button type="button" className="btn btn-outline-primary ml-4" data-toggle="modal" data-target="#imageEditor">Edit Profile Image</button>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label lead font-weight-normal">Player Comparison:</label>
                      <input type="text" className={`form-control mb-1 ${this.state.playerComparisonValid ? "" : "is-invalid"}`} name="playerComparison" value={this.state.playerComparison ? this.state.playerComparison : ""} onChange={this.onChange} placeholder="Required" />
                      <div className="invalid-feedback">Player Comparison is required</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label lead font-weight-normal">Shooting Hand:</label>
                      <input type="text" className={`form-control mb-1 ${this.state.shootingHandValid ? "" : "is-invalid"}`} name="shootingHand" value={this.state.shootingHand ? this.state.shootingHand : ""} onChange={this.onChange} placeholder="Required" />
                      <div className="invalid-feedback">Shooting Hand is required</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label lead font-weight-normal">Bio:</label>
                      <textarea type="text" className={`form-control mb-1 ${this.state.bioValid ? "" : "is-invalid"}`} rows="3" name="bio" value={this.state.bio ? this.state.bio : ""} onChange={this.onChange} placeholder="Required" />
                      <div className="invalid-feedback">Bio is required</div>
                    </div>
                    <button type="button" className="btn btn-primary mt-1" onClick={this.updateProfile} disabled={!this.state.profileValid}>Save Changes</button>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-telephone">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label lead font-weight-normal">Phone Numbers:</label>
                      {this.state.telephones.map((item) =>
                        <div key={item.id}>
                          <div>{item.phoneNumber}<button type="button" className="btn btn-sm btn-outline-danger" onClick={() => this.deletePhone(item.id)}>Delete</button></div>
                        </div>)}
                    </div>
                    <button type="button" className="btn btn-outline-primary mt-1 mb-2" onClick={this.showPhoneInput}>Add Contact</button>
                    {this.state.showPhoneInput === true &&
                      <div className="input-group">
                        <MaskedInput name="phoneNumber" className={`form-control mb-1 ${this.state.phoneNumberValid ? "" : "is-invalid"}`} value={this.state.phoneNumber} onChange={this.onChange} guide={true} showMask={true} mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
                        <span className="input-group-append"><button className="btn btn-primary" onClick={this.saveTelephone} disabled={!this.state.telephoneValid}>Save</button></span>
                        <span className="input-group-append"><button className="btn btn-danger" onClick={this.hidePhoneInput}>Cancel</button></span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="imageEditor">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Edit Profile Image
                                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">x</button>
              </div>
              <div className="modal-body mx-auto">
                <Avatar
                  height={250}
                  width={250}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                />
                <img className="mt-4" src={this.state.preview ? this.state.preview : "data:image/png;base64,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"} alt="Preview" style={{ width: "250px", height: "250px" }} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveCroppedImage}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  }
}

export default withRouter(connect(mapStateToProps)(AccountSettings));
