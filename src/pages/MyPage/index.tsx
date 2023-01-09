import { ChangeEvent, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GrFormAdd, GrFormClose } from 'react-icons/gr';

import { MapBox, Container, InfoBox, ProfileBox, Message, Button } from './style';
import { IUserData } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUserData } from '../../redux/reducers/UserDateSlice';
import useGetUserData from '../../hooks/useGetUserData';

// API 문서 확정되면 수정하기
const careerMaps = [0, 1, 2];

export default function MyPage() {
  const location = useLocation();
  const history = useHistory();
  const fileInput = useRef<HTMLInputElement>(null);

  useGetUserData(); // DB에서 사용자 정보 불러오기
  const userData = useAppSelector((state) => state.userData.entities);
  const dispatch = useAppDispatch();

  // input value
  const [picture, setPicture] = useState(userData?.picture);
  const [name, setName] = useState(userData?.name);
  const [age, setAge] = useState(userData?.age);
  const [gender, setGender] = useState('여자');
  const [job, setJob] = useState(userData?.job);
  const [address, setAddress] = useState(userData?.address);
  const [univ, setUniv] = useState(userData?.univ);
  const [major, setMajor] = useState(userData?.major);
  const [interestField, setInterestField] = useState(userData?.interestField);
  const [phone, setPhone] = useState(userData?.phone);
  const [email, setEmail] = useState(userData?.email);
  const [link, setLink] = useState(userData?.link);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filelink = URL.createObjectURL(event.target.files[0]);
      setPicture(filelink);
    }
  };

  const onClickImg = () => {
    if (location.hash === '#edit') {
      fileInput.current?.click();
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.currentTarget.name as keyof IUserData;
    const value = event.currentTarget.value;

    if (inputName === 'name') {
      setName(value);
    }
    if (inputName === 'age') {
      setAge(value);
    }
    if (inputName === 'gender') {
      setGender(value);
    }
    if (inputName === 'job') {
      setJob(value);
    }
    if (inputName === 'address') {
      setAddress(value);
    }
    if (inputName === 'univ') {
      setUniv(value);
    }
    if (inputName === 'major') {
      setMajor(value);
    }
    if (inputName === 'interestField') {
      setInterestField(value);
    }
    if (inputName === 'phone') {
      setPhone(value);
    }
    if (inputName === 'email') {
      setEmail(value);
    }
    if (inputName === 'link') {
      setLink(value);
    }
  };
  const onClickSave = () => {
    saveData();
    history.push('/mypage');
  };

  const saveData = () => {
    const updatedData = userData;

    Object.assign(updatedData as IUserData, {
      picture,
      name,
      age,
      gender,
      job,
      address,
      univ,
      major,
      interestField,
      phone,
      email,
      link,
    });
    dispatch(setUserData(updatedData));

    // DB 수정
  };

  const onClickCancel = () => {
    resetInput();
    history.push('/mypage');
  };

  const resetInput = () => {
    setPicture(userData?.picture);
    setName(userData?.name);
    setAge(userData?.age);
    setGender(userData?.gender as string);
    setJob(userData?.job);
    setAddress(userData?.address);
    setUniv(userData?.univ);
    setMajor(userData?.major);
    setInterestField(userData?.interestField);
    setPhone(userData?.phone);
    setEmail(userData?.email);
    setLink(userData?.link);
  };

  const onClickEdit = () => {
    history.push('/mypage#edit');
  };

  return (
    <Container>
      {location.hash === '#edit' && <Message>내용을 클릭하여 수정하세요</Message>}
      <div className="content">
        <div className="content__top">
          <ProfileBox>
            <input ref={fileInput} type="file" name="picture" accept="image/png, image/jpeg" onChange={onChangeFile} />
            <img
              style={{ cursor: location.hash === '#edit' ? 'pointer' : 'unset' }}
              onClick={onClickImg}
              src={picture === '' ? require('../../assets/profile.jpg') : picture}
            />
            <div className="profile__info">
              <div>
                <p>이름</p>
                <p>나이</p>
                <p>성별</p>
                <p>직업</p>
                <p>거주</p>
              </div>
              <div>
                {location.hash === '#edit' ? (
                  <>
                    <input name="name" value={name} onChange={onChangeInput} />
                    <input name="age" value={age} onChange={onChangeInput} />
                    <input name="gender" value={gender} onChange={onChangeInput} />
                    <input name="job" value={job} onChange={onChangeInput} />
                    <input name="address" value={address} onChange={onChangeInput} />
                  </>
                ) : (
                  <>
                    <p>{userData?.name}</p>
                    <p>{userData?.age}</p>
                    <p>{userData?.gender}</p>
                    <p>{userData?.job}</p>
                    <p>{userData?.address}</p>
                  </>
                )}
              </div>
            </div>
          </ProfileBox>

          <div className="content__right">
            <div className="content__info">
              <InfoBox>
                {location.hash === '#edit' ? (
                  <>
                    <p>
                      🏫 <input name="univ" value={univ} onChange={onChangeInput} />
                    </p>
                    <p>
                      📚 <input name="major" value={major} onChange={onChangeInput} />
                    </p>
                    <p>
                      관심 분야: <input name="interestField" value={interestField} onChange={onChangeInput} />
                    </p>
                  </>
                ) : (
                  <>
                    <p>🏫 {userData?.univ}</p>
                    <p>📚 {userData?.major}</p>
                    <p>관심 분야: {userData?.interestField}</p>
                  </>
                )}
              </InfoBox>
              <InfoBox>
                {location.hash === '#edit' ? (
                  <>
                    <p>
                      📞 <input name="phone" value={phone} onChange={onChangeInput} />
                    </p>
                    <p>
                      ✉️ <input name="email" value={email} onChange={onChangeInput} />
                    </p>
                    <p>
                      📄 <input name="link" value={link} onChange={onChangeInput} />
                    </p>
                  </>
                ) : (
                  <>
                    <p>📞 {userData?.phone}</p>
                    <p>✉️ {userData?.email}</p>
                    <p>📄 {userData?.link}</p>
                  </>
                )}
              </InfoBox>
            </div>

            <MapBox>
              <h3>내 커리어 맵</h3>
              <div>
                {careerMaps.map((item) => (
                  <div key={item} className="map">
                    {location.hash === '#edit' && (
                      <GrFormClose
                        onClick={() => {
                          confirm('맵을 삭제하겠습니까?');
                        }}
                        color="#FF3D3D"
                      />
                    )}
                  </div>
                ))}
                <div className="map button">
                  <GrFormAdd size="3.2rem" />
                </div>
              </div>
            </MapBox>
          </div>
        </div>

        <div className="content__bottom">
          {location.hash === '#edit' ? (
            <>
              <Button onClick={onClickSave}>저장</Button>
              <Button onClick={onClickCancel}>취소</Button>
            </>
          ) : (
            <Button onClick={onClickEdit}>프로필 수정</Button>
          )}
        </div>
      </div>
    </Container>
  );
}
