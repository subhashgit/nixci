import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Image,
  Modal,
  FlatList,
  Platform,
  Alert
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

const RegisterScreen = ({ navigation }) => {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2
    accountType: '',
    
    // Step 3
    profilePhoto: null,
    phoneNumber: '',
    address: '',
    occupationType: '',
    age: '',
    about: '',
    languages: ['English'],
    gender: '',
    nationality: '',
    
    // Step 4
    hasQualifications: true,
    qualifications: [],
    currentQualification: {
      title: '',
      year: '',
      description: '',
      certificate: null
    },
    
    // Step 5
    medicalStatus: 'fit',
    medicalHistory: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    
    // Step 6
    companyName: '',
    companyWebsite: '',
    companyAddress: '',
    companyPhone: '',
    companyRegNo: '',
    
    // Step 7
    companyPhoto: null,
    companyDescription: '',
    utrNumber: '',
    vatNumber: ''
  });

  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPasswordError, setShowPasswordError] = useState(true);

  const [languageInput, setLanguageInput] = useState('');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Handle form field changes
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Password validation
    if (name === 'password') {
      validatePassword(value);
    }
  };

  // Password validation
  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    
    const isValid = hasMinLength && hasCapitalLetter && hasSpecialChar && hasNumber;
    
    if (!isValid && password.length > 0) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
    
    return isValid;
  };

  // Validate step 1
  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // Handle qualification changes
  const handleQualificationChange = (name, value) => {
    setFormData({
      ...formData,
      currentQualification: {
        ...formData.currentQualification,
        [name]: value
      }
    });
  };

  // Add new qualification
  const addQualification = () => {
    if (formData.currentQualification.title) {
      setFormData({
        ...formData,
        qualifications: [...formData.qualifications, formData.currentQualification],
        currentQualification: {
          title: '',
          year: '',
          description: '',
          certificate: null
        }
      });
    }
  };

  // Add new language
  const addLanguage = () => {
    if (languageInput && !formData.languages.includes(languageInput)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, languageInput]
      });
      setLanguageInput('');
    }
    setShowLanguageModal(false);
  };

  // Remove language
  const removeLanguage = (language) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(lang => lang !== language)
    });
  };

  // Render step 1 - Basic Info
  const renderStep1 = () => (
    <ScrollView contentContainerStyle={styles.step1Container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.labourBaseLogo}
          resizeMode="contain"
        />
        </View>
        <View style={styles.geometricShape} >
          <Image 
          source={require('../../assets/images/icon.png')} 
          style={styles.iconbg}
          resizeMode="contain"
        />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>Sign up to get started</Text>
        <Text style={styles.subtitle}>Fill in your details.</Text>

        {/* Form Fields */}
        <View style={styles.formFields}>
          {/* First Name and Last Name in one row */}
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                value={formData.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                placeholder="First Name"
              />
              {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            </View>
            <View style={styles.nameFieldLast}>
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                value={formData.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
                placeholder="Last Name"
              />
              {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              placeholder="Password"
              secureTextEntry
            />
            {showPasswordError && (
              <Text style={styles.passwordErrorText}>
                Password must be at least 8 characters long and contain a capital letter, special character and a number.
              </Text>
            )}
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
        </View>

        {/* Buttons in one row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Join via invite</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={handleNextStep}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <TouchableOpacity style={styles.loginLink}>
          <Text style={styles.loginLinkText}>Already have an account? Log In</Text>
        </TouchableOpacity>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            Create your NIXCI Profile for access to
          </Text>
          
          {/* LabourBase Logo */}
          <View style={styles.labourBaseContainer}>
            
            <Image 
          source={require('../../assets/images/labour-logo.png')} 
          style={styles.labourBaseLogo}
          resizeMode="contain"
        />
          </View>
          
          {/* Partner Logos */}
          <View style={styles.partnersSection}>
            <Text style={styles.partnersText}>Working with</Text>
            <View style={styles.partnerLogos}>
              <Text style={styles.partnerLogo}>
                <MaterialIcons name="user" size={20} color="#007AFF" />
              </Text>
              <Text style={styles.partnerLogo}>
              <MaterialIcons name="user" size={20} color="#007AFF" />
              </Text>
              <Text style={styles.partnerLogo}>
              <MaterialIcons name="user" size={20} color="#007AFF" />
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  // Render step 2 - Account Type
  const renderStep2 = () => (
    <ScrollView contentContainerStyle={styles.step2Container}>
      {/* Header */}
      <View style={styles.step2Header}>
        <View style={styles.step2Logo}>
          <Image source={require('../../assets/images/icon.png')} style={styles.arrowForward} />
        </View>
        <Text style={styles.step2Title}>Are you a company or an individual?</Text>
        <Text style={styles.step2Subtitle}>Select your profile type</Text>
      </View>

      {/* Selection Options */}
      <View style={styles.selectionContainer}>
        {/* Option 1: Sole Trader / Jobseeker */}
        <View style={styles.selectionCardwrapper}>
        <TouchableOpacity 
          style={[styles.selectionCard, formData.accountType === 'soleTrader' && styles.selectedCard]}
          onPress={() => handleChange('accountType', 'soleTrader')}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, formData.accountType === 'soleTrader' && styles.selectedCardTitle]}>
              I am a sole trader / Jobseeker
            </Text>
            <View style={styles.cardImage}>
            <Image source={require('../../assets/images/labour.png')} style={styles.cardImage} />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.cardDescription}>
          You are self employed and want to register for access to the Labourbase job market place
        </Text>
        </View>
        {/* Option 2: Company / Work for a company */}
        <View style={styles.selectionCardwrapper}>
        <TouchableOpacity 
          style={[styles.selectionCard, formData.accountType === 'company' && styles.selectedCard]}
          onPress={() => handleChange('accountType', 'company')}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, formData.accountType === 'company' && styles.selectedCardTitle]}>
              I am a Company / Work for a company
            </Text>
            <View style={styles.cardImage}>
              <Image source={require('../../assets/images/labour.png')} style={styles.cardImage} />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.cardDescription}>
          You want to make use of the NIXCI project and site management services.
        </Text>
        </View>
        {/* Option 3: Seeking access to existing site */}
        <View style={styles.selectionCardwrapper}>
        <TouchableOpacity 
          style={[styles.selectionCard, formData.accountType === 'siteAccess' && styles.selectedCard]}
          onPress={() => handleChange('accountType', 'siteAccess')}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, formData.accountType === 'siteAccess' && styles.selectedCardTitle]}>
              I am seeking access to an existing site
            </Text>
            <View style={styles.cardImage}>
            <Image source={require('../../assets/images/labour.png')} style={styles.cardImage} />
            </View>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.cardDescription}>
          You'll need access to NIXCI to sign in and out of sites, as well as managing site documents such as RAMS, RFI's and CVI's.
        </Text>
        <Text style={styles.blueText}>
          *Only to be used by self employed sole traders, if you work for a company use option 2
        </Text>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSectionN}>
        <Text style={styles.footerText}>
          Create your NIXCI Profile for access to
        </Text>
        <View style={styles.labourBaseContainer}>
        <Image 
          source={require('../../assets/images/labour-logo.png')} 
          style={styles.labourBaseLogo}
          resizeMode="contain"
        />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentStep(1)}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.primaryButton, !formData.accountType && styles.disabledButton]}
          onPress={() => formData.accountType && setCurrentStep(3)}
          disabled={!formData.accountType}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Render step 3 - Personal Details
  const renderStep3 = () => (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <View style={styles.StepheaderIcon}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerIcon} />
        <Image source={require('../../assets/images/labour-logo.png')} style={styles.headerIcon2} />
      </View>
      <Text style={styles.stepNumber}>Step 1</Text>
      <Text style={styles.stepTitle}>Add your personal details</Text>
      
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton}>
          <MaterialIcons  name="cloud-upload" size={30} color="#555" />
          <Text style={styles.uploadText}>Upload  Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={formData.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
          placeholder="Enter your address"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Occupation Type</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={[styles.radioButton, formData.occupationType === 'professional' && styles.radioButtonSelected]}
            onPress={() => handleChange('occupationType', 'professional')}
          >
            <Text style={styles.radioButtonText}>Professional</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioButton, formData.occupationType === 'labour' && styles.radioButtonSelected]}
            onPress={() => handleChange('occupationType', 'labour')}
          >
            <Text style={styles.radioButtonText}>Labour</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
          placeholder="Enter your age"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>About Yourself</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.about}
          onChangeText={(text) => handleChange('about', text)}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Languages</Text>
        <View style={styles.languageContainer}>
          {formData.languages.map((language, index) => (
            <View key={index} style={styles.languageTag}>
              <Text style={styles.languageText}>{language}</Text>
              <TouchableOpacity onPress={() => removeLanguage(language)}>
                <MaterialIcons  name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity 
            style={styles.addLanguageButton}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.addLanguageText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(itemValue) => handleChange('gender', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
          <Picker.Item label="Prefer not to say" value="preferNotToSay" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nationality</Text>
        <TextInput
          style={styles.input}
          value={formData.nationality}
          onChangeText={(text) => handleChange('nationality', text)}
          placeholder="Enter your nationality"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentStep(2)}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentStep(4)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Language</Text>
            <TextInput
              style={styles.modalInput}
              value={languageInput}
              onChangeText={setLanguageInput}
              placeholder="Enter language"
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalAddButton}
                onPress={addLanguage}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  // Render step 4 - Qualifications
  const renderStep4 = () => (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <View style={styles.StepheaderIcon}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerIcon} />
        <Image source={require('../../assets/images/labour-logo.png')} style={styles.headerIcon2} />
      </View>
      <Text style={styles.stepNumber}>Step 2</Text>
      <Text style={styles.stepTitle}>Qualifications</Text>
      
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={!formData.hasQualifications}
          onValueChange={(value) => handleChange('hasQualifications', !value)}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>I have no training qualifications</Text>
      </View>

      {formData.hasQualifications && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Course/Qualification Title</Text>
            <TextInput
              style={styles.input}
              value={formData.currentQualification.title}
              onChangeText={(text) => handleQualificationChange('title', text)}
              placeholder="Enter qualification title"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Year Completed</Text>
            <TextInput
              style={styles.input}
              value={formData.currentQualification.year}
              onChangeText={(text) => handleQualificationChange('year', text)}
              placeholder="Enter year"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.currentQualification.description}
              onChangeText={(text) => handleQualificationChange('description', text)}
              placeholder="Enter description"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.uploadContainer}>
            <TouchableOpacity style={styles.uploadButton}>
              <MaterialIcons  name="attach-file" size={30} color="#555" />
              <Text style={styles.uploadText}>Upload Certificate</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={addQualification}
            disabled={!formData.currentQualification.title}
          >
            <Text style={styles.addButtonText}>+ Add Qualification</Text>
          </TouchableOpacity>

          {formData.qualifications.length > 0 && (
            <View style={styles.qualificationsList}>
              <Text style={styles.sectionSubtitle}>Your Qualifications:</Text>
              {formData.qualifications.map((qual, index) => (
                <View key={index} style={styles.qualificationItem}>
                  <Text style={styles.qualificationTitle}>{qual.title}</Text>
                  <Text style={styles.qualificationDetail}>Year: {qual.year}</Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentStep(3)}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentStep(5)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Render step 5 - Medical Information
  const renderStep5 = () => (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <View style={styles.StepheaderIcon}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerIcon} />
        <Image source={require('../../assets/images/labour-logo.png')} style={styles.headerIcon2} />
      </View>
      <Text style={styles.stepNumber}>Step 3</Text>
      <Text style={styles.stepTitle}>Medical Information</Text>
      
      <View style={styles.radioGroupVertical}>
        <TouchableOpacity 
          style={[styles.radioButtonVertical, formData.medicalStatus === 'fit' && styles.radioButtonSelected]}
          onPress={() => handleChange('medicalStatus', 'fit')}
        >
          <Text style={styles.radioButtonText}>I am fit for work</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.radioButtonVertical, formData.medicalStatus === 'history' && styles.radioButtonSelected]}
          onPress={() => handleChange('medicalStatus', 'history')}
        >
          <Text style={styles.radioButtonText}>I have medical history</Text>
        </TouchableOpacity>
      </View>

      {formData.medicalStatus === 'history' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Medical History Details</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.medicalHistory}
            onChangeText={(text) => handleChange('medicalHistory', text)}
            placeholder="Please describe your medical history"
            multiline
            numberOfLines={4}
          />
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Emergency Contact Name</Text>
        <TextInput
          style={styles.input}
          value={formData.emergencyContactName}
          onChangeText={(text) => handleChange('emergencyContactName', text)}
          placeholder="Enter emergency contact name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Emergency Contact Number</Text>
        <TextInput
          style={styles.input}
          value={formData.emergencyContactNumber}
          onChangeText={(text) => handleChange('emergencyContactNumber', text)}
          placeholder="Enter emergency contact number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentStep(4)}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentStep(6)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Render step 6 - Company Information
  const renderStep6 = () => (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <View style={styles.StepheaderIcon}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerIcon} />
        <Image source={require('../../assets/images/labour-logo.png')} style={styles.headerIcon2} />
      </View>
      <Text style={styles.stepNumber}>Step 4</Text>
      <Text style={styles.stepTitle}>Company Information</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Company Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.companyName}
          onChangeText={(text) => handleChange('companyName', text)}
          placeholder="Enter company name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Company Website</Text>
        <TextInput
          style={styles.input}
          value={formData.companyWebsite}
          onChangeText={(text) => handleChange('companyWebsite', text)}
          placeholder="Enter website URL"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Company Address *</Text>
        <TextInput
          style={styles.input}
          value={formData.companyAddress}
          onChangeText={(text) => handleChange('companyAddress', text)}
          placeholder="Enter company address"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Company Phone *</Text>
        <TextInput
          style={styles.input}
          value={formData.companyPhone}
          onChangeText={(text) => handleChange('companyPhone', text)}
          placeholder="Enter company phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Company House Registration Number</Text>
        <TextInput
          style={styles.input}
          value={formData.companyRegNo}
          onChangeText={(text) => handleChange('companyRegNo', text)}
          placeholder="Enter registration number"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentStep(5)}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentStep(7)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Render step 7 - Complete Profile
  const renderStep7 = () => (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <View style={styles.StepheaderIcon}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerIcon} />
        <Image source={require('../../assets/images/labour-logo.png')} style={styles.headerIcon2} />
      </View>
      <Text style={styles.stepNumber}>Step 5</Text>
      <Text style={styles.stepTitle}>Complete Your Profile</Text>
      
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton}>
          <MaterialIcons  name="add-a-photo" size={30} color="#555" />
          <Text style={styles.uploadText}>Upload Company Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Company Business Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.companyDescription}
          onChangeText={(text) => handleChange('companyDescription', text)}
          placeholder="Describe your company business"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>UTR Number</Text>
        <TextInput
          style={styles.input}
          value={formData.utrNumber}
          onChangeText={(text) => handleChange('utrNumber', text)}
          placeholder="Enter UTR number"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>VAT Number (if applicable)</Text>
        <TextInput
          style={styles.input}
          value={formData.vatNumber}
          onChangeText={(text) => handleChange('vatNumber', text)}
          placeholder="Enter VAT number"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentStep(6)}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            // Handle final submission
            console.log('Form submitted:', formData);
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.buttonText}>Complete Registration</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Main render
  return (
    <View style={styles.container}>
      {/* Progress Bar - Only show for steps 2-7 */}
      {currentStep > 1 && (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${((currentStep - 1) / 6) * 100}%` }]} />
        </View>
      )}

      {/*  
      {currentStep > 1 && (
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step {currentStep - 1} of 6</Text>
        </View>
      )}
    
      */}
      <View style={styles.contentContainer}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
        {currentStep === 7 && renderStep7()}
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  stepIndicator: {
    padding: 15,
    alignItems: 'flex-end',
  },
  stepText: {
    color: '#666',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
  },
  stepContainer: {
    
    padding: 20,
    paddingTop: 10,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#214cb6',
    textAlign:'center'
  },
  stepNumber:{fontSize:16,fontWeight:'bold',color:'#214cb6',textAlign:'center'},
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#214cb6',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
    marginRight: 10,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  accountTypeCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  selectedAccountType: {
    borderColor: '#007AFF',
    backgroundColor: '#e6f2ff',
  },
  accountTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  accountTypeDescription: {
    fontSize: 14,
    color: '#666',
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  uploadText: {
    marginTop: 10,
    color: '#555',
    fontSize: 14,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  radioButtonVertical: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  radioButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#e6f2ff',
  },
  radioButtonText: {
    fontSize: 16,
    color: '#333',
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageTag: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  languageText: {
    color: '#fff',
    marginRight: 5,
  },
  addLanguageButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLanguageText: {
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancelButton: {
    padding: 10,
    marginRight: 10,
  },
  modalAddButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  modalAddButtonText: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qualificationsList: {
    marginTop: 15,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  qualificationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  qualificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qualificationDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  // New styles for step 1
  step1Container: {
    
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {

    width: 200,
    height: 200,

    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
  },
  geometricShape: {
    opacity: 0.1,
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  formFields: {
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  passwordErrorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    lineHeight: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inviteButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inviteButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  // New styles for step 1
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nameField: {
    flex: 1,
    marginRight: 10,
  },
  nameFieldLast: {
    flex: 1,
  },
  footerSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerSectionN: {
    marginTop: 20,
    paddingTop: 20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    
  },
  footerText: {
    fontSize: 14,
    color: '#214cb6',
    textAlign: 'center',
    marginBottom: 0,
  },
  labourBaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  labourBaseLogo: {
    width: 150,
    height: 50,
  },
  partnersSection: {
    alignItems: 'center',
    marginBottom:30,
  },
  partnersText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  partnerLogos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  partnerLogo: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  iconbg:{
    width: 100,
    height: 100,
  },
  // New styles for step 2
  step2Container: {
    
    backgroundColor: '#fff',
    padding: 20,
  },
  step2Header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  step2Logo: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  arrowForward:{ width: 40,
    height: 40,},
  step2Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  step2Subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  selectionContainer: {
    marginBottom: 0,
  },
  selectionCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 0,
    backgroundColor: '#214cb6',
  },
  selectedCard: {
    borderColor: '#007AFF',
    backgroundColor: '#214cb699',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  selectedCardTitle: {
    color: '#fff',
  },
  cardImage: {
    width: 60,
    height: 60,
    paddingLeft:10,
    borderRadius: 75,
    backgroundColor: '#007AFF77',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginTop: 10,
    lineHeight: 20,
  },
  blueText: {
    fontSize: 12,
    color: '#214cb6',
    textAlign: 'left',
    marginTop: 10,
    fontStyle: 'italic',
  },
  selectionCardwrapper:{padding:10,borderWidth:1,borderColor:'#fafafa',backgroundColor:'#f8f8f8' ,borderRadius:10,marginBottom:20},
  StepheaderIcon:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20,paddingTop:20},
  headerIcon:{width:105,height:35},
  headerIcon2:{width:115,height:30},
});

export default RegisterScreen;