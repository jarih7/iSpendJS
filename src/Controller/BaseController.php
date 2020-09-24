<?php


namespace App\Controller;


use App\Entity\Merchant;
use App\Entity\Spending;
use App\Entity\User;
use DateTime;
use DateTimeZone;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BaseController extends AbstractController
{

    /**
     * @Route("/", name="index")
     * @return Response
     */
    public function index()
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        return $this->render('base.html.twig', ['users' => $users]);
    }

    /**
     * @Route("/getUser", name="getUser")
     * @param Request $request
     * @return JsonResponse
     */
    public function apiGetUser(Request $request)
    {
        $json = json_decode($request->getContent(), true);
        $username = $json["username"];
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['username' => $username]);

        $jsonData = ['id'       => $user->getId(), 'firstName' => $user->getFirstName(),
                     'lastName' => $user->getLastName(), 'username' => $user->getUsername()];

        return new JsonResponse($jsonData);
    }

    /**
     * @Route("/getUsers", name="getUsers")
     * @param Request $request
     * @return JsonResponse
     */
    public function apiGetUsers(Request $request) {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        $jsonData = [];

        foreach ($users as $user) {
            array_push($jsonData, $user->getUsername());
        }

        return new JsonResponse($jsonData);
    }

    /**
     * @Route("/getSpendings", name="getSpendings")
     * @param Request $request
     * @return Response
     */
    public function apiGetSpendings(Request $request)
    {
        $json = json_decode($request->getContent(), true);

        $id = strval($json["id"]);
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        $spendings = $user->getSpendings();

        $jsonData = [];
        $length = sizeof($spendings);

        for ($i = 0; $i < $length; $i++) {
            $friend = $spendings[$i]->getFriend();

            if ($friend === null) {
                $friendId = 0;
                $friendUsername = '';
            } else {
                $friendId = $friend->getId();
                $friendUsername = $friend->getUsername();
            }

            array_push($jsonData, ['id'         => $spendings[$i]->getId(), 'name' => $spendings[$i]->getName(),
                                   'price'      => $spendings[$i]->getPrice(), 'portion' => $spendings[$i]->getPortion(),
                                   'date' => $spendings[$i]->getDate(), 'userId' => $spendings[$i]->getUser()->getId(),
                                   'username' => $spendings[$i]->getUser()->getUsername(),
                                   'spendingUserId' => $spendings[$i]->getUser()->getId(), 'friendId' => $friendId,
                                   'friendUsername' => $friendUsername, 'merchantName' => $spendings[$i]->getMerchant()->getName()]);
        }

        return new JsonResponse($jsonData);
    }

    /**
     * @Route("/getFriends", name="getFriends")
     * @param Request $request
     * @return JsonResponse
     */
    public function apiGetFriends(Request $request) {
        $json = json_decode($request->getContent(), true);

        $id = strval($json["id"]);
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        $friends = $user->getHasFriends();

        $jsonData = [];
        $length = sizeof($friends);

        for ($i = 0; $i < $length; $i++) {
            $friend = $friends[$i];

            array_push($jsonData, [
                'id' => $friend->getId(),
                'firstName' => $friend->getFirstName(),
                'lastName' => $friend->getLastName(),
                'username' => $friend->getUsername()
            ]);
        }

        return new JsonResponse($jsonData);
    }

    /**
     * @Route("/getMerchants", name="getMerchants")
     * @param Request $request
     * @return JsonResponse
     */
    public function apiGetMerchants(Request $request) {
        $merchants = $this->getDoctrine()->getRepository(Merchant::class)->findAll();

        $jsonData = [];
        $length = sizeof($merchants);

        for ($i = 0; $i < $length; $i++) {
            $merchant = $merchants[$i];

            array_push($jsonData, [
                'id' => $merchant->getId(),
                'name' => $merchant->getName()
            ]);
        }

        return new JsonResponse($jsonData);
    }

    /**
     * @Route("/processNewSpending", name="processNewSpending")
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function apiProcessNewSpending(Request $request) {
        $json = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();

        $userId = strval($json['userId']);
        $user = $this->getDoctrine()->getRepository(User::class)->find($userId);
        $friendUsername = strval($json['friend']);

        if ($friendUsername != 'nobody')
            $friend = $this->getDoctrine()->getRepository(User::class)->findOneBy(['username' => $friendUsername]);
        $spendingName = strval($json['spendingName']);
        $spendingPrice = floatval($json['spendingPrice']);
        $spendingPortion = floatval($json['spendingPortion']);
        $merchantName = strval($json['merchantName']);
        $merchant = $this->getDoctrine()->getRepository(Merchant::class)->findOneBy(['name' => $merchantName]);

        $spending = new Spending(1, $spendingName, $spendingPrice, $spendingPortion, new DateTime('now', new DateTimeZone('Europe/Prague')), $merchant, $user);

        if ($friendUsername != 'nobody')
            $spending->setFriend($friend);

        $em->persist($spending);
        $em->flush();

        return new JsonResponse();
    }
}