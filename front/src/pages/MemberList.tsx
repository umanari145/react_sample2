import { FC, useEffect, useState } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import { Member } from '../class/Member';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 100%;
`;

// 擬似APIレスポンスの型定義
interface ApiResponse {
  success: boolean;
  data: Member[];
  message?: string;
}

// 擬似API: setTimeoutを使ってMemberデータを返す
const fetchMembersFromFakeApi = (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    // 1.5秒後にデータを返す
    setTimeout(() => {
      const mockMembers: Member[] = [
        {
          member_id: 'M001',
          name: '山田太郎',
          score: 85,
          status: 'active',
        },
        {
          member_id: 'M002',
          name: '佐藤花子',
          score: 92,
          status: 'active',
        },
        {
          member_id: 'M003',
          name: '鈴木一郎',
          score: 78,
          status: 'inactive',
        },
        {
          member_id: 'M004',
          name: '田中美咲',
          score: 88,
          status: 'active',
        },
        {
          member_id: 'M005',
          name: '高橋健太',
          score: 95,
          status: 'active',
        },
      ];

      resolve({
        success: true,
        data: mockMembers,
        message: 'メンバー情報を取得しました',
      });
    }, 1500);
  });
};

export const MemberList: FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetchMembersFromFakeApi();
        if (response.success) {
          setMembers(response.data);
        } else {
          setMembers([]);
          setError('データの取得に失敗しました');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setMembers([]);
        setError('エラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <Wrapper>
      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-bold mb-4">メンバー一覧</h1>
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
              <p className="mt-4 text-gray-600">読み込み中...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!isLoading && !error && members.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            メンバーが見つかりません
          </div>
        )}

        {!isLoading && members.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    メンバーID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名前
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    スコア
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member: Member) => (
                  <tr key={`member-${member.member_id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.member_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {member.status === 'active' ? 'アクティブ' : '非アクティブ'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
