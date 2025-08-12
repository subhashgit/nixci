import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Platform,
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = ({ navigation }) => {
  // User type state
  const [userType, setUserType] = useState('soleTrader');
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    companyName: '',
    industryType: '',
    primaryTrade: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle form field changes
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Prepare data based on user type
    const userData = {
      userType,
      firstName: formData.firstName,
      lastName: formData.lastName,
      location: formData.location,
      phoneNumber: formData.phoneNumber,
      email: formData.email
    };

    if (userType === 'soleTrader' || userType === 'company') {
      userData.companyName = formData.companyName;
      userData.industryType = formData.industryType;
    } else if (userType === 'worker') {
      userData.primaryTrade = formData.primaryTrade;
    }

    console.log('Registration data:', userData);
    // Here you would typically send the data to your backend API
    // navigation.navigate('Verification'); // Navigate after successful registration
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>
      
      {/* User Type Selection */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>I am a:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#666"
          >
            <Picker.Item label="Sole Trader" value="soleTrader" />
            <Picker.Item label="Company" value="company" />
            <Picker.Item label="Worker for Company" value="worker" />
          </Picker>
        </View>
      </View>

      {/* Common Fields */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>First Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          placeholder="Enter first name"
          returnKeyType="next"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Last Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          placeholder="Enter last name"
          returnKeyType="next"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => handleChange('location', text)}
          placeholder="Enter your location"
          returnKeyType="next"
        />
      </View>

      {/* Conditional Fields for Sole Trader/Company */}
      {(userType === 'soleTrader' || userType === 'company') && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Company Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.companyName}
              onChangeText={(text) => handleChange('companyName', text)}
              placeholder="Enter company name"
              returnKeyType="next"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Industry Type *</Text>
            <TextInput
              style={styles.input}
              value={formData.industryType}
              onChangeText={(text) => handleChange('industryType', text)}
              placeholder="Enter industry type"
              returnKeyType="next"
            />
          </View>
        </>
      )}

      {/* Conditional Field for Worker */}
      {userType === 'worker' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Primary Trade/Occupation *</Text>
          <TextInput
            style={styles.input}
            value={formData.primaryTrade}
            onChangeText={(text) => handleChange('primaryTrade', text)}
            placeholder="Enter your primary trade"
            returnKeyType="next"
          />
        </View>
      )}

      {/* Optional Phone Number */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={formData.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
          placeholder="Enter phone number (optional)"
          keyboardType="phone-pad"
          returnKeyType="next"
        />
      </View>

      {/* Email */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Enter email address"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
        />
      </View>

      {/* Password */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          placeholder="Enter password (min 8 characters)"
          secureTextEntry
          returnKeyType="next"
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          placeholder="Confirm your password"
          secureTextEntry
          returnKeyType="done"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#444',
    fontSize: 14,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  loginText: {
    color: '#666',
    marginRight: 5,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default RegisterScreen;