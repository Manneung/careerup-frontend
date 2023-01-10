import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GrFormAdd, GrFormClose } from 'react-icons/gr';

import { MapBox, Container, InfoBox, ProfileBox, Message, Button } from './style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { patchUserData, setUserData } from '../../redux/reducers/UserDateSlice';
import useGetUserData from '../../hooks/useGetUserData';

const careerMaps = [0, 1, 2];

export default function MyPage() {
  const location = useLocation();
  const history = useHistory();
  const fileInput = useRef<HTMLInputElement>(null);

  useGetUserData(); // DB에서 사용자 정보 불러오기
  const isLoading = useAppSelector((state) => state.userData.loading);
  const userData = useAppSelector((state) => state.userData.entities);
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState(userData);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsEdit(location.hash === '#edit');
  }, [location.hash]);

  useEffect(() => {
    setInputs(userData);
  }, [isLoading]);

  const onClickImg = () => {
    if (isEdit) {
      fileInput.current?.click();
    }
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filelink = URL.createObjectURL(event.target.files[0]);
      setInputs({ ...inputs, picture: filelink });
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [inputName]: value,
    });
  };

  const onClickSave = () => {
    saveData();
    history.push('/mypage');
  };

  const saveData = () => {
    dispatch(setUserData(inputs));
    dispatch(patchUserData(inputs));
  };

  const onClickCancel = () => {
    resetInputs();
    history.push('/mypage');
  };

  const resetInputs = () => {
    setInputs(userData);
  };

  const onClickEdit = () => {
    history.push('/mypage#edit');
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      {isEdit && <Message>내용을 클릭하여 수정하세요</Message>}
      <div className="content">
        <div className="content__top">
          <ProfileBox>
            <input ref={fileInput} type="file" name="picture" accept="image/png, image/jpeg" onChange={onChangeFile} />
            <img style={{ cursor: isEdit ? 'pointer' : 'unset' }} onClick={onClickImg} src={inputs.picture} />
            <div className="profile__info">
              <div>
                <p>이름</p>
                <p>나이</p>
                <p>성별</p>
                <p>직업</p>
                <p>거주</p>
              </div>
              <div>
                {isEdit ? (
                  <>
                    <input name="name" value={inputs.name} onChange={onChangeInput} />
                    <input name="age" value={inputs.age} onChange={onChangeInput} />
                    <input name="gender" value={inputs.gender} onChange={onChangeInput} />
                    <input name="job" value={inputs.job} onChange={onChangeInput} />
                    <input name="address" value={inputs.address} onChange={onChangeInput} />
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
                {isEdit ? (
                  <>
                    <p>
                      🏫 <input name="univ" value={inputs.univ} onChange={onChangeInput} />
                    </p>
                    <p>
                      📚 <input name="major1" value={inputs.major1} onChange={onChangeInput} />
                    </p>
                    <p>
                      관심 분야: <input name="interestField1" value={inputs.interestField1} onChange={onChangeInput} />
                    </p>
                  </>
                ) : (
                  <>
                    <p>🏫 {userData?.univ}</p>
                    <p>📚 {userData?.major1}</p>
                    <p>관심 분야: {userData?.interestField1}</p>
                  </>
                )}
              </InfoBox>
              <InfoBox>
                {isEdit ? (
                  <>
                    <p>
                      📞 <input name="phone" value={inputs.phone} onChange={onChangeInput} />
                    </p>
                    <p>
                      ✉️ <input name="username" value={inputs.username} onChange={onChangeInput} />
                    </p>
                    <p>
                      📄 <input name="link" value={inputs.link} onChange={onChangeInput} />
                    </p>
                  </>
                ) : (
                  <>
                    <p>📞 {userData?.phone}</p>
                    <p>✉️ {userData?.username}</p>
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
                    {isEdit && (
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
          {isEdit ? (
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
